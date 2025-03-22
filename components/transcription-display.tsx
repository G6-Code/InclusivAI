"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Edit2, Save, X } from "lucide-react"

interface TranscriptionDisplayProps {
  transcription: string
}

export function TranscriptionDisplay({ transcription }: TranscriptionDisplayProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTranscription, setEditedTranscription] = useState(transcription)

  if (transcription !== editedTranscription && !isEditing) {
    setEditedTranscription(transcription)
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedTranscription(transcription)
  }

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg">Transcription</CardTitle>
        {transcription && !isEditing && (
          <Button variant="ghost" size="sm" onClick={handleEdit} aria-label="Edit transcription">
            <Edit2 className="h-4 w-4 mr-1" />
            Edit
          </Button>
        )}
        {isEditing && (
          <div className="flex gap-1">
            <Button variant="ghost" size="sm" onClick={handleSave} aria-label="Save edited transcription">
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button variant="ghost" size="sm" onClick={handleCancel} aria-label="Cancel editing">
              <X className="h-4 w-4 mr-1" />
              Cancel
            </Button>
          </div>
        )}
      </CardHeader>
      <CardContent>
        {transcription ? (
          isEditing ? (
            <Textarea
              value={editedTranscription}
              onChange={(e) => setEditedTranscription(e.target.value)}
              className="max-h-40 overflow-auto resize-none"
              placeholder="Edit transcription..."
            />
          ) : (
            <div className="bg-muted p-4 rounded-md max-h-40 overflow-auto text-sm">
              {editedTranscription}
            </div>
          )
        ) : (
          <div className="flex items-center justify-center max-h-40 text-muted-foreground text-center p-4">
            <p>Transcription will appear here after processing audio</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
