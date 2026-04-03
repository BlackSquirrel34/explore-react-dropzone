"use client";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React, { useCallback } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";

export default function Uploader() {
  // isDragActive boolean will bee true whenever we drag over our dropzone
  // getInput must eb applied to an input tag
  // onDrop function is called whenever we drop a file into our dropzone -- one or several
  // see react-dropzone.js.org for more details

  const onDrop = useCallback((acceptedFiles: File[]) => {
    console.log(acceptedFiles);
  }, []);

  const onDropRejected = useCallback((fileRejections: FileRejection[]) => {
    console.log(fileRejections);
    if (fileRejections.length > 0) {
      const tooManyFiles = fileRejections.find(
        (fileRejection) => fileRejection.errors[0].code === "too-many-files",
      );
      const fileTooLarge = fileRejections.find(
        (fileRejection) => fileRejection.errors[0].code === "file-too-large",
      );
      const invalidFileType = fileRejections.find(
        (fileRejection) => fileRejection.errors[0].code === "file-invalid-type",
      );

      if (tooManyFiles) {
        toast.error("You can only upload one file at a time.");
      }
      if (fileTooLarge) {
        toast.error("File is too large. Maximum size is 5MB.");
      }
      if (invalidFileType) {
        toast.error("Invalid file type. Only images are allowed.");
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    // validation options for the files we want to accept
    maxFiles: 1,
    maxSize: 1024 * 1024 * 5, // 5mb
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
      //"application/pdf": [".pdf"],
    },
  });

  return (
    <Card
      className={cn(
        "relative border-2 border-blue-600 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
        isDragActive
          ? "border-green-500 bg-green-200 border-solid"
          : "hover:border-green-500",
      )}
      {...getRootProps()}
    >
      <CardContent className="flex flex-col items-center justify-center h-full w-full">
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drag &apos;n&apos; drop some files here, or click to select files
          </p>
        )}
      </CardContent>
    </Card>
  );
}
