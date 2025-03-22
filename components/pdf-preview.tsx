"use client"

import { Document, Page, pdfjs } from "react-pdf"
import { useState } from "react"
import { Card } from "@/components/ui/card"

pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

interface PdfPreviewProps {
  fileUrl: string
}

export function PdfPreview({ fileUrl }: PdfPreviewProps) {
  const [numPages, setNumPages] = useState<number | null>(null)

  return (
    <Card className="cursor-pointer hover:shadow-lg transition" onClick={() => window.open(fileUrl, "_blank")}>
      <Document file={fileUrl} onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
        <Page pageNumber={1} width={200} />
      </Document>
      <p className="text-sm text-center p-2">Click to open</p>
    </Card>
  )
}
