"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useUpload } from "@/hooks/useUpload"
import { useTranscription } from "@/hooks/useTranscription"

interface UploadAudioProps {
  audioFile: File | null
  setAudioFile: (file: File | null) => void
  onUploadComplete: (filename: string) => Promise<void> // Asegurar que esta función esté en la interfaz
}

export function UploadAudio({ audioFile, setAudioFile, onUploadComplete }: UploadAudioProps) {
  const { uploadFileToBlob, uploadProgress, isUploading } = useUpload()
  const [file, setFile] = useState<File | null>(audioFile)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setAudioFile(selectedFile) // Actualiza el estado en el padre
    }
  }

  const handleUpload = async () => {
    if (!file) return

    const sasUrl = process.env.NEXT_PUBLIC_AUDIO_SAS_URL as string
    const filename = await uploadFileToBlob(file, sasUrl)

    if (filename) {
      onUploadComplete(filename) // Llamar a la función para obtener la transcripción
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="audioUpload" className="text-base">
        Upload Audio
      </Label>
      <Input id="audioUpload" type="file" accept=".wav,.mp3" onChange={handleFileChange} />
      {file && <p className="text-sm text-muted-foreground">Selected file: {file.name}</p>}
      <Button type="button" className="mt-2" onClick={handleUpload} disabled={isUploading}>
        {isUploading ? "Uploading..." : "Upload Audio"}
      </Button>

      {uploadProgress > 0 && <p>Upload progress: {uploadProgress}%</p>}
    </div>
  )
}
