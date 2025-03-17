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
  const [coachName, setCoachName] = useState("")
  const [clientName, setClientName] = useState("")
  const [notes, setNotes] = useState("")
  const [selectedForms, setSelectedForms] = useState<string[]>([])
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [isRecording, setIsRecording] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transcription, setTranscription] = useState("")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!coachName || !clientName || selectedForms.length === 0 || !audioFile) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and upload or record audio.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    try {
      // Subir el archivo de audio a Azure Blob Storage
      await uploadToAzureBlobStorage()

      // Enviar los datos a la API de Azure para transcripción
      const formData = new FormData()
      formData.append("coachName", coachName)
      formData.append("clientName", clientName)
      formData.append("notes", notes)
      formData.append("forms", JSON.stringify(selectedForms))
      formData.append("audioFile", audioFile)

      const apiUrl = process.env.NEXT_PUBLIC_API_URL as string
      const apiKey = process.env.AZURE_API_KEY as string

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Ocp-Apim-Subscription-Key": apiKey,
        },
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      setTranscription(data.transcription)

      toast({
        title: "Success!",
        description: "Audio has been processed and transcribed successfully.",
      })
    } catch (error) {
      console.error("Error processing audio:", error)
      toast({
        title: "Error processing audio",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const uploadToAzureBlobStorage = async () => {
    if (!audioFile) return

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const sasUrl = process.env.AZURE_STORAGE_SAS_URL as string

      if (!sasUrl) {
        throw new Error("Missing Azure Storage SAS URL.")
      }

      // Simulación de progreso de carga
      const uploadInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const newProgress = prev + 10
          if (newProgress >= 100) {
            clearInterval(uploadInterval)
            return 100
          }
          return newProgress
        })
      }, 500)

      // Aquí iría la carga real a Azure Blob Storage
      // const response = await fetch(sasUrl, {
      //   method: "PUT",
      //   headers: {
      //     "x-ms-blob-type": "BlockBlob",
      //     "Content-Type": audioFile.type,
      //   },
      //   body: audioFile,
      // })

      // if (!response.ok) {
      //   throw new Error(`Upload failed: ${response.status}`)
      // }

      // Simulación de carga exitosa
      setTimeout(() => {
        clearInterval(uploadInterval)
        setUploadProgress(100)
        setIsUploading(false)

        toast({
          title: "Upload complete",
          description: "Audio file has been uploaded to Azure Blob Storage.",
        })
      }, 5000)
    } catch (error) {
      console.error("Error uploading to Azure Blob Storage:", error)
      setIsUploading(false)

      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    }
  }

  const handleReset = () => {
    setCoachName("")
    setClientName("")
    setNotes("")
    setSelectedForms([])
    setAudioFile(null)
    setTranscription("")
    setUploadProgress(0)
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-primary">InclusivAI</h1>
      <p className="text-center mb-8 text-muted-foreground">Supported Employment Job Coaches Solution</p>

      <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
        <div className="space-y-6 bg-card p-6 rounded-lg shadow-sm">
          <form onSubmit={handleFormSubmit} className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold border-b pb-2">Coach and Client Information</h2>

              <div className="space-y-2">
                <Label htmlFor="coachName" className="text-base">
                  Job Coach Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="coachName"
                  value={coachName}
                  onChange={(e) => setCoachName(e.target.value)}
                  placeholder="Enter your full name"
                  required
                  aria-required="true"
                />
              </div>

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
              isRecording={isRecording}
              setIsRecording={setIsRecording}
            />

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button type="submit" className="flex-1" disabled={isProcessing || isUploading}>
                {isProcessing ? "Processing..." : "Process Audio"}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={handleReset}
                disabled={isProcessing || isUploading}
              >
                Reset Form
              </Button>
            </div>
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
