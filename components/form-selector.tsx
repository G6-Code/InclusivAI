"use client"

import { useState } from "react"
import { Document, Page } from "react-pdf"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface FormSelectorProps {
  selectedForms: string[]
  setSelectedForms: (forms: string[]) => void
}

const forms = [
  { id: "0009", name: "Positive Personal Profile Summary", file: "/pdf/0009 - Positive Personal Profile Summary.pdf" },
  { id: "0010", name: "Supported Employment Initial Placement Information Report", file: "/pdf/0010 - Supported Employment Initial Placement Information Report.pdf" },
  { id: "0011", name: "Job Coaching Progress Report - Day 30", file: "/pdf/0011 - Job Coaching Progress Report - Day 30.pdf" },
  { id: "0012", name: "Job Coaching Progress Report", file: "/pdf/0012 - Job Coaching Progress Report.pdf" },
  { id: "0013", name: "Supported Employment Job Stabilization Progress Report", file: "/pdf/0013 - Supported Employment Job Stabilization Progress Report.pdf" },
  { id: "0014", name: "Supported Employment Letter of Commitment", file: "/pdf/0014 - Supported Employment Letter of Commitment.pdf" },
  { id: "0015", name: "Trial Work Evaluation Report (TWER)", file: "/pdf/0015 Trial Work Evaluation Report (TWER).pdf" },
  { id: "0016", name: "Plan of Extended Services and Support", file: "/pdf/0016 - Plan of Extended Services and Support.pdf" }
]

export function FormSelector({ selectedForms, setSelectedForms }: FormSelectorProps) {
  const [previewFile, setPreviewFile] = useState<string | null>(null)

  const toggleSelection = (formId: string) => {
    if (selectedForms.includes(formId)) {
      setSelectedForms(selectedForms.filter((id) => id !== formId))
    } else {
      setSelectedForms([...selectedForms, formId])
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold border-b pb-2">Select Form Types <span className="text-destructive">*</span></h2>
      <p className="text-muted-foreground">Select one or more forms for transcription</p>

      <div className="grid grid-cols-2 gap-4">
        {forms.map((form) => (
          <div key={form.id} className="flex items-center gap-2 border p-2 rounded shadow-sm cursor-pointer" 
               onClick={() => setPreviewFile(form.file)}>
            <Checkbox
              id={form.id}
              checked={selectedForms.includes(form.id)}
              onCheckedChange={() => toggleSelection(form.id)}
            />
            <Label htmlFor={form.id} className="text-sm cursor-pointer">
              {form.id} - {form.name}
            </Label>
          </div>
        ))}
      </div>

      {/* Vista previa del PDF */}
      {previewFile && (
        <div className="mt-4 border rounded-lg shadow-sm p-4">
          <h3 className="text-md font-semibold mb-2">Preview</h3>
          <Document file={previewFile}>
            <Page pageNumber={1} width={200} />
          </Document>
        </div>
      )}
    </div>
  )
}
