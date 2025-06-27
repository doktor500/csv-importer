"use client";

import { ChangeEvent, FormEvent } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FileText, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { httpClient } from "@/lib/httpClient";

export default function CsvUploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleAddFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setSelectedFile(file);
    setError(undefined);
  };

  const handleRemoveFile = () => {
    setSelectedFile(undefined);
    setError(undefined);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (selectedFile) {
      const formData = new FormData();
      formData.append("file", selectedFile);
      setIsUploading(true);

      await httpClient
        .post("/api/csv", { body: formData })
        .then(() => router.push("/products"))
        .catch(() => setError("Failed to upload file. Please try again."))
        .finally(() => setIsUploading(false));
    }
  };

  return (
    <Card className="mx-auto w-full max-w-md border-gray-800 bg-gray-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gray-100">
          <Upload className="size-5" />
          Upload CSV File
        </CardTitle>
        <CardDescription className="text-gray-400">Select a CSV file to upload</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="mb-4 space-y-2">
            <Input
              id="csv-file"
              type="file"
              accept=".csv,text/csv"
              onChange={handleAddFile}
              className="cursor-pointer border-gray-700 bg-gray-800 text-gray-200 file:text-gray-400"
            />
          </div>

          {selectedFile && (
            <div className="my-2 flex items-center justify-between rounded-lg border border-gray-700 bg-gray-800 p-3">
              <div className="flex items-center gap-2">
                <FileText className="size-4 text-gray-400" />
                <div className="text-sm">
                  <p className="font-medium text-gray-200">{selectedFile.name}</p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleRemoveFile}
                className="size-8 cursor-pointer p-0 text-gray-400 hover:bg-gray-700 hover:text-gray-200"
              >
                <X className="size-4" />
              </Button>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="my-2">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white hover:bg-blue-700"
            disabled={!selectedFile || isUploading}
          >
            {isUploading ? "Uploading..." : "Upload CSV"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
