"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUpload } from "@/hooks/useUpload"

interface UploadDocumentProps {
  documentFile: File | null
  setDocumentFile: (file: File | null) => void
}

export function UploadDocument({ documentFile, setDocumentFile }: UploadDocumentProps) {
  const { uploadFileToBlob, uploadProgress, isUploading } = useUpload()
  const [file, setFile] = useState<File | null>(documentFile)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setDocumentFile(selectedFile) 
    }
  }

  const handleUpload = async () => {
    if (!file) return

    const sasUrl = process.env.NEXT_PUBLIC_DOCUMENT_SAS_URL as string
    await uploadFileToBlob(file, sasUrl)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="documentUpload" className="text-base">
        Upload Document
      </Label>
      <Input id="documentUpload" type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} />
      {file && <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>}
      <Button type="button" className="mt-2" onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload Document"}
      </Button>

      {uploadProgress > 0 && <p>Upload progress: {uploadProgress}%</p>}
    </div>
  )
}
