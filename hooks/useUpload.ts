"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function useUpload() {
  const { toast } = useToast()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const uploadFileToBlob = async (file: File, sasUrl: string) => {
    setIsUploading(true)
    setUploadProgress(0)

    try {
      if (!sasUrl) {
        throw new Error("Missing Azure Storage SAS URL.")
      }

      const response = await fetch(sasUrl, {
        method: "PUT",
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "Content-Type": file.type,
        },
        body: file,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`)
      }

      setUploadProgress(100)
      setIsUploading(false)

      toast({
        title: "Upload complete",
        description: `${file.name} has been uploaded successfully.`,
      })

      return file.name // Retorna el nombre del archivo para obtener la transcripción
    } catch (error) {
      console.error("Error uploading file:", error)
      setIsUploading(false)

      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    }
  }

  return { uploadFileToBlob, uploadProgress, isUploading }
}
