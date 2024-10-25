import { useState } from "react";

export const useUploadTournamentFile = () => {
  const [fileLoading, setLoading] = useState<boolean>(false);
  const [fileError, setError] = useState<string>("");
  const [fileMessage, setMessage] = useState<string>("");

  async function UploadFile(file: File) {
    console.log("File upload request");
    // Reset states
    setLoading(true);
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/tournament/file/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("File uplaod failed");
      }

      const data = await res.json();
      setMessage(data.success);
      console.log("id: ", data.id);
      return data.id;
    } catch (err: any) {
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return { fileLoading, fileError, fileMessage, UploadFile };
};
