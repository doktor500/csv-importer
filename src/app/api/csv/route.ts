import "core-js/features/promise/with-resolvers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Readable } from "stream";
import { importCsv } from "@/modules/usecases/importCsv";
import busboy from "busboy";
import streamWeb from "node:stream/web";
import { HTTP_STATUS } from "@/lib/httpStatus";

const { BAD_REQUEST, SERVER_ERROR } = HTTP_STATUS;

// Disable Next.js alternative runtimes as this endpoint needs streaming capabilities
export const runtime = "nodejs";

// Disable the default Next.js body parser behaviour
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(request: NextRequest) {
  const { promise: fileStreamPromise, resolve: resolveFileStream } = Promise.withResolvers();
  const { promise: streamPromise, resolve: resolveStream } = Promise.withResolvers();
  const stream = busboy({ headers: Object.fromEntries(request.headers.entries()) });

  if (!request.body) return NextResponse.json({ error: "Invalid request body" }, { status: BAD_REQUEST });

  stream.on("file", (_, fileStream) => {
    fileStream
      .on("data", (data) => importCsv.execute(Buffer.from(data).toString("utf-8")))
      .on("end", () => resolveFileStream(NextResponse.json({ success: true })))
      .on("error", (error) => resolveFileStream(NextResponse.json({ error: error.message }, { status: SERVER_ERROR })));
  });

  stream.on("finish", () => resolveStream(NextResponse.json({ error: "No file uploaded" }, { status: BAD_REQUEST })));
  stream.on("error", () => resolveStream(NextResponse.json({ error: "Server error" }, { status: SERVER_ERROR })));

  Readable.fromWeb(<streamWeb.ReadableStream>request.body).pipe(stream);

  return Promise.race([fileStreamPromise, streamPromise]);
}
