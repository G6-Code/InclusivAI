"use client"

import type React from "react"
import { useState } from "react"
import { AudioRecorder } from "@/components/audio-recorder"
import { FormSelector } from "@/components/form-selector"
import { TranscriptionDisplay } from "@/components/transcription-display"
import { UploadProgress } from "@/components/upload-progress"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"

export default function InclusivAI() {
  const { toast } = useToast()
  const [clientName, setClientName] = useState("")
  const [notes, setNotes] = useState("")
  const [selectedForms, setSelectedForms] = useState<string[]>([])
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [documentFile, setDocumentFile] = useState<File | null>(null) // Nuevo estado para documentos
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcription, setTranscription] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setDocumentFile(e.target.files[0])
    }
  }

  const uploadDocumentToAzureBlobStorage = async () => {
    if (!documentFile) {
      toast({
        title: "No document selected",
        description: "Please select a document to upload.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const sasUrl = process.env.NEXT_PUBLIC_DOCUMENT_SAS_URL as string

      if (!sasUrl) {
        throw new Error("Missing Azure Storage SAS URL for documents.")
      }

      const response = await fetch(sasUrl, {
        method: "PUT",
        headers: {
          "x-ms-blob-type": "BlockBlob",
          "Content-Type": documentFile.type,
        },
        body: documentFile,
      })

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`)
      }

      setUploadProgress(100)
      setIsUploading(false)

      toast({
        title: "Upload complete",
        description: "Document has been uploaded to Azure Blob Storage.",
      })
    } catch (error) {
      console.error("Error uploading document:", error)
      setIsUploading(false)

      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-center mb-8 text-primary">InclusivAI</h1>
      <p className="text-center mb-8 text-muted-foreground">Supported Employment Job Coaches Solution</p>

      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6 bg-card p-6 rounded-lg shadow-sm">
          <form className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Client Information</h2>

              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-base">
                  Client Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="clientName"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Enter client's full name"
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <FormSelector selectedForms={selectedForms} setSelectedForms={setSelectedForms} />

            {/* 🔹 Nuevo campo para subir documentos */}
            <div className="space-y-2">
              <Label htmlFor="documentUpload" className="text-base">
                Upload Document
              </Label>
              <Input
                id="documentUpload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleDocumentChange}
              />
              {documentFile && <p className="text-sm text-muted-foreground">Selected file: {documentFile.name}</p>}
              <Button
                type="button"
                className="mt-2"
                onClick={uploadDocumentToAzureBlobStorage}
                disabled={isUploading}
              >
                {isUploading ? "Uploading..." : "Upload Document"}
              </Button>
            </div>
            {/* 🔹 Fin de nuevo campo */}

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-base">
                Additional Notes
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter any additional information or context"
                className="min-h-[100px]"
              />
            </div>

            <AudioRecorder
              audioFile={audioFile}
              setAudioFile={setAudioFile}
              isRecording={isProcessing}
              setIsRecording={setIsProcessing}
            />
          </form>
        </div>

        <div className="space-y-6">
          {(isUploading || uploadProgress > 0) && <UploadProgress progress={uploadProgress} />}
          <TranscriptionDisplay transcription={transcription} />
        </div>
      </div>

      <Toaster />
    </main>
  )
}
