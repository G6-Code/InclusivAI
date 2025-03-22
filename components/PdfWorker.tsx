// components/PdfWorker.tsx
"use client"

import { useEffect } from "react"
import { pdfjs } from "react-pdf"

export function PdfWorker() {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
  }, [])

  return null
}
