"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export function useTranscription() {
  const { toast } = useToast()
  const [transcription, setTranscription] = useState("")
  const [isFetching, setIsFetching] = useState(false)

  const fetchTranscription = async (filename: string) => {
    setIsFetching(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_TRANSCRIPTION_API_URL}?filename=${filename}-transcription.txt`
      )

      if (!response.ok) {
        throw new Error(`Failed to fetch transcription: ${response.status}`)
      }

      const text = await response.text()
      setTranscription(text)

      toast({
        title: "Transcription retrieved",
        description: "The audio has been successfully transcribed.",
      })
    } catch (error) {
      console.error("Error fetching transcription:", error)
      toast({
        title: "Transcription error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsFetching(false)
    }
  }

  return { transcription, fetchTranscription, isFetching }
}
