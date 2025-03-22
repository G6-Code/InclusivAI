"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft, Mail, Phone } from "lucide-react"

export default function CoachProfile() {
  const router = useRouter()

  return (
    <main className="container mx-auto px-6 py-10 max-w-3xl bg-card shadow-md rounded-lg">
      {/* Botón de volver */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.back()} className="flex items-center text-primary hover:underline">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-primary">Coach Profile</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold text-primary mb-4">👨‍🏫 Kevin Johnson</h2>
        <p className="text-lg font-medium text-card-foreground">Employment Coach</p>
        <p className="text-sm text-card-foreground">Coach ID: <strong>#C-2025-KJ01</strong></p>

        <div className="flex items-center mt-2 text-card-foreground">
          <Mail className="h-4 w-4 mr-2 text-primary" />
          <a href="mailto:kevin.johnson@inclusivai.com" className="text-primary hover:underline">
            kevin.johnson@inclusivai.com
          </a>
        </div>
        <div className="flex items-center mt-2 text-card-foreground">
          <Phone className="h-4 w-4 mr-2 text-primary" />
          <span>(+1) 555-123-4567</span>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">Assigned Workers</h2>
        <ul className="list-disc pl-6 space-y-3 text-card-foreground">
          <li>
            <strong>Mateo Ramírez</strong> - Worker ID: W-2025-MR01
            <a href="/workers/mateo-ramirez" className="ml-2 text-primary hover:underline text-sm">View Profile</a>
          </li>
          <li>
            <strong>James Carter</strong> - Worker ID: W-2025-JC02
            <a href="/workers/james-carter" className="ml-2 text-primary hover:underline text-sm">View Profile</a>
          </li>
          <li>
            <strong>Liam Parker</strong> - Worker ID: W-2025-LP03
            <a href="/workers/liam-parker" className="ml-2 text-primary hover:underline text-sm">View Profile</a>
          </li>
          <li>
            <strong>Alison Mandell</strong> - Worker ID: W-2025-AM04
            <a href="/workers/alison-mandell" className="ml-2 text-primary hover:underline text-sm">View Profile</a>
          </li>
        </ul>
      </div>
    </main>
  )
}
