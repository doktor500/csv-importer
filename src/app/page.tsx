import CsvUploadForm from "@/app/_components/UploadForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-950 p-24">
      <CsvUploadForm />
    </main>
  );
}
