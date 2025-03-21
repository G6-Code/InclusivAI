"use client"

import { useState } from "react"
import { FormSelector } from "@/components/form-selector"
import { TranscriptionDisplay } from "@/components/transcription-display"
import { UploadProgress } from "@/components/upload-progress"
import { UploadDocument } from "@/components/upload-document"
import { AudioRecorder } from "@/components/audio-recorder" // 🎤 Agregado para grabar audio
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { useUpload } from "@/hooks/useUpload"
import { useTranscription } from "@/hooks/useTranscription"

export default function InclusivAI() {
  const { toast } = useToast()
  const { uploadFileToBlob, uploadProgress, isUploading } = useUpload()
  const { transcription, fetchTranscription } = useTranscription()

  const [clientName, setClientName] = useState("")
  const [notes, setNotes] = useState("")
  const [selectedForms, setSelectedForms] = useState<string[]>([])
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [documentFile, setDocumentFile] = useState<File | null>(null)

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-2xl font-bold text-center mb-8 text-primary">InclusivAI</h1>
      <p className="text-center mb-8 text-muted-foreground">
        Supported Employment Job Coaches Solution
      </p>

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

            {/* 🔹 Sección de carga de documentos */}
            <UploadDocument documentFile={documentFile} setDocumentFile={setDocumentFile} />

            {/* 🔹 Sección de carga/grabación de audio */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Audio Upload & Recording</h2>
              <AudioRecorder setAudioFile={setAudioFile} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-base">Additional Notes</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter any additional information or context"
                className="min-h-[100px]"
              />
            </div>
          </form>
        </div>

        <div className="space-y-6">
          <UploadProgress progress={uploadProgress} />
          <TranscriptionDisplay transcription={transcription} />
        </div>
      </div>

      <Toaster />
    </main>
  )
}
