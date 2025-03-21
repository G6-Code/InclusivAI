"use client"

import { useState } from "react"

export function useUpload() {
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const uploadFileToBlob = async (file: File, sasUrl: string) => {
    if (!sasUrl) {
      console.error("SAS URL is missing.")
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const response = await fetch(`${sasUrl}/${file.name}`, {
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
      return file.name
    } catch (error) {
      console.error("Error uploading file:", error)
      setIsUploading(false)
    }
  }

  return { uploadFileToBlob, uploadProgress, isUploading }
}
