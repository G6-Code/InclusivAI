"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function JobSuggestions() {
  const router = useRouter()

  return (
    <main className="container mx-auto px-6 py-10 max-w-3xl bg-card shadow-md rounded-lg">
      
      {/* 🔹 Botón Back */}
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="flex items-center text-primary hover:underline">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
      </div>

      {/* 🔹 Título */}
      <h1 className="text-3xl font-bold text-primary text-center mb-6">Job Suggestions</h1>

      {/* 🔹 Lista de sugerencias */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">Suggested Jobs</h2>
        <ul className="space-y-3 text-card-foreground">
          <li><strong>Software Engineer</strong> - Google</li>
          <li><strong>Data Analyst</strong> - Microsoft</li>
          <li><strong>UX Designer</strong> - Amazon</li>
          <li><strong>Project Manager</strong> - IBM</li>
          <li><strong>DevOps Engineer</strong> - Facebook</li>
        </ul>
      </div>

      <div className="h-10"></div>
    </main>
  )
}
