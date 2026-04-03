import Image from "next/image";
import Uploader from "./components/Uploader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 space-y-24">
      <div className="text-3xl leading-2.5">Upload your files here</div>
      <Uploader />
    </main>
  );
}
