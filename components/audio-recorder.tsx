"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Mic, Upload, Play, Square, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface AudioRecorderProps {
  audioFile: File | null
  setAudioFile: (file: File | null) => void
  isRecording: boolean
  setIsRecording: (isRecording: boolean) => void
}

export function AudioRecorder({ audioFile, setAudioFile, isRecording, setIsRecording }: AudioRecorderProps) {
  const { toast } = useToast()
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [audioChunks, setAudioChunks] = useState<Blob[]>([])
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    // Verifica si el navegador soporta getUserMedia
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast({
        title: "Microphone not supported",
        description: "Your browser does not support microphone access.",
        variant: "destructive",
      })
    }
  }, [])

  const requestMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      console.log("Microphone access granted", stream)
      return stream
    } catch (error) {
      console.error("Microphone access denied", error)
      toast({
        title: "Microphone access denied",
        description: "Please allow microphone access in your browser settings.",
        variant: "destructive",
      })
      return null
    }
  }

  const startRecording = async () => {
    try {
      const stream = await requestMicrophonePermission()
      if (!stream) return

      const recorder = new MediaRecorder(stream)
      setAudioChunks([])
      setMediaRecorder(recorder)

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          setAudioChunks((prev) => [...prev, e.data])
        }
      }

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" })
        const url = URL.createObjectURL(audioBlob)
        setAudioUrl(url)

        // Crear un archivo a partir del Blob
        const file = new File([audioBlob], "recording.wav", { type: "audio/wav" })
        setAudioFile(file)

        // Subir a Azure Blob Storage
        uploadToAzureBlobStorage(file)
      }

      recorder.start()
      setIsRecording(true)

      toast({
        title: "Recording started",
        description: "Speak clearly into your microphone.",
      })
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.stop()
      setIsRecording(false)

      // Detener todas las pistas de audio
      mediaRecorder.stream.getTracks().forEach((track) => track.stop())

      toast({
        title: "Recording stopped",
        description: "Your audio has been captured and is being uploaded.",
      })
    }
  }

  const uploadToAzureBlobStorage = async (file: File) => {
    try {
      const sasUrl = process.env.NEXT_PUBLIC_AZURE_BLOB_SAS_URL as string

      if (!sasUrl) {
        throw new Error("Azure Storage SAS URL is missing.")
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

      toast({
        title: "Upload complete",
        description: "Your audio has been uploaded to Azure Blob Storage.",
      })
    } catch (error) {
      console.error("Error uploading to Azure Blob Storage:", error)
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const file = files[0]
    const allowedTypes = ["audio/wav", "audio/mpeg", "audio/mp3"]

    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a .wav or .mp3 file.",
        variant: "destructive",
      })
      return
    }

    setAudioFile(file)
    setAudioUrl(URL.createObjectURL(file))

    toast({
      title: "File uploaded",
      description: `${file.name} has been uploaded.`,
    })

    // Subir archivo a Azure
    uploadToAzureBlobStorage(file)
  }

  const playAudio = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  const clearAudio = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl)
    }
    setAudioFile(null)
    setAudioUrl(null)
    setAudioChunks([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4 border rounded-lg p-4">
      <div className="flex justify-between items-center">
        <Label className="text-base font-medium">Audio Recording/Upload</Label>
        {audioFile && (
          <Button type="button" variant="destructive" size="sm" onClick={clearAudio} aria-label="Clear audio">
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {!isRecording ? (
          <Button
            type="button"
            onClick={startRecording}
            variant="outline"
            className="flex-1"
            disabled={!!audioFile}
            aria-label="Start recording"
          >
            <Mic className="h-4 w-4 mr-2" />
            Record Audio
          </Button>
        ) : (
          <Button
            type="button"
            onClick={stopRecording}
            variant="destructive"
            className="flex-1 animate-pulse"
            aria-label="Stop recording"
          >
            <Square className="h-4 w-4 mr-2" />
            Recording...
          </Button>
        )}

        <div className="relative flex-1">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => fileInputRef.current?.click()}
            disabled={isRecording}
            aria-label="Upload audio file"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload Audio
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".wav,.mp3,audio/wav,audio/mpeg"
            onChange={handleFileUpload}
            className="sr-only"
            aria-label="Upload audio file"
          />
        </div>
      </div>

      {audioUrl && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={playAudio}
              disabled={isPlaying}
              aria-label={isPlaying ? "Playing audio" : "Play audio"}
            >
              <Play className="h-4 w-4 mr-2" />
              {isPlaying ? "Playing..." : "Play"}
            </Button>
            <span className="text-sm text-muted-foreground">{audioFile?.name || "recording.wav"}</span>
          </div>
          <audio ref={audioRef} src={audioUrl} onEnded={handleAudioEnded} className="hidden" controls />
        </div>
      )}
    </div>
  )
}
