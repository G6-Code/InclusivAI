"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Mic, Play, Square, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface AudioRecorderProps {
  setAudioFile: (file: File | null) => void
}

export function AudioRecorder({ setAudioFile }: AudioRecorderProps) {
  const { toast } = useToast()
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [audioChunks, setAudioChunks] = useState<Blob[]>([])
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      toast({
        title: "Microphone not supported",
        description: "Your browser does not support microphone access.",
        variant: "destructive",
      })
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
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

        const file = new File([audioBlob], `recording-${Date.now()}.wav`, { type: "audio/wav" })
        setAudioFile(file)
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
      mediaRecorder.stream.getTracks().forEach((track) => track.stop())

      toast({
        title: "Recording stopped",
        description: "Your audio has been recorded.",
      })
    }
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
  }

  return (
    <div className="space-y-4 border rounded-lg p-4">
      <Label className="text-base font-medium">Record Audio</Label>

      <div className="flex gap-3">
        {!isRecording ? (
          <Button
            type="button"
            onClick={startRecording}
            variant="outline"
            disabled={!!audioUrl}
            aria-label="Start recording"
          >
            <Mic className="h-4 w-4 mr-2" />
            Record
          </Button>
        ) : (
          <Button
            type="button"
            onClick={stopRecording}
            variant="destructive"
            className="animate-pulse"
            aria-label="Stop recording"
          >
            <Square className="h-4 w-4 mr-2" />
            Stop
          </Button>
        )}

        {audioUrl && (
          <Button
            type="button"
            variant="secondary"
            onClick={playAudio}
            disabled={isPlaying}
            aria-label="Play audio"
          >
            <Play className="h-4 w-4 mr-2" />
            {isPlaying ? "Playing..." : "Play"}
          </Button>
        )}

        {audioUrl && (
          <Button
            type="button"
            variant="destructive"
            onClick={clearAudio}
            aria-label="Clear audio"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>

      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} onEnded={handleAudioEnded} className="hidden" controls />
      )}
    </div>
  )
}
