"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { FormSelector } from "@/components/form-selector"
import { TranscriptionDisplay } from "@/components/transcription-display"
import { UploadProgress } from "@/components/upload-progress"
import { UploadDocument } from "@/components/upload-document"
import { AudioRecorder } from "@/components/audio-recorder"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Toaster } from "@/components/ui/toaster"
import { useToast } from "@/hooks/use-toast"
import { useUpload } from "@/hooks/useUpload"
import { useTranscription } from "@/hooks/useTranscription"

export default function Dashboard() {
  const router = useRouter()
  const { toast } = useToast()
  const { uploadFileToBlob, uploadProgress, isUploading } = useUpload()
  const { transcription, fetchTranscription } = useTranscription()

  const [clientName, setClientName] = useState("")
  const [notes, setNotes] = useState("")
  const [selectedForms, setSelectedForms] = useState<string[]>([])
  const [audioFile, setAudioFile] = useState<File | null>(null)
  const [documentFile, setDocumentFile] = useState<File | null>(null)

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn")
    if (!isLoggedIn) {
      router.push("/") 
    }
  }, [])

  return (
    <main className="container mx-auto px-4 py-8 max-w-4xl">
  
      {/* 🔹 Barra superior con botones */}
      <div className="flex justify-end items-center mb-6 space-x-3">
        
        {/* 🔹 Botón a perfil del coach */}
        <Link 
          href="/coach-profile"
          className="bg-white text-green-600 border border-green-600 px-3 py-1 text-xs rounded hover:bg-green-100 transition"
        >
          Coach Profile
        </Link>

        {/* 🔹 Botón a sugerencias de empleo */}
        <Link 
          href="/job-suggestions"
          className="bg-white text-blue-600 border border-blue-600 px-3 py-1 text-xs rounded hover:bg-blue-100 transition"
        >
          Job Suggestions
        </Link>

        {/* 🔹 Botón a políticas de IA */}
        <Link 
          href="/responsible-ai"
          className="bg-white text-green-600 border border-green-600 px-3 py-1 text-xs rounded hover:bg-green-100 transition"
        >
          Responsible AI Policies
        </Link>

        {/* 🔹 Botón Logout */}
        <button
          className="bg-red-500 text-white px-3 py-1 text-xs rounded hover:bg-red-600 transition"
          onClick={() => {
            localStorage.removeItem("loggedIn")
            router.push("/")
          }}
        >
          Logout
        </button>
      </div>

      <h1 className="text-2xl font-bold text-center mb-8 text-primary">InclusivAI - Dashboard</h1>
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
                />
              </div>
            </div>

            <FormSelector selectedForms={selectedForms} setSelectedForms={setSelectedForms} />

            <UploadDocument documentFile={documentFile} setDocumentFile={setDocumentFile} />

            {/*Sección de audio */}
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
