"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function Workers() {
  const router = useRouter()

  const workers = [
    { name: "Mateo Ramírez", id: "mateo-ramirez" },
    { name: "James Carter", id: "james-carter" },
    { name: "Liam Parker", id: "liam-parker" },
    { name: "Alison Mandell", id: "alison-mandell" },
  ]

  return (
    <main className="container mx-auto px-6 py-10 max-w-3xl bg-card shadow-md rounded-lg">
      
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.back()} className="flex items-center text-primary hover:underline">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-primary">Workers</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-primary mb-4">Assigned Workers</h2>
        <ul className="space-y-4">
          {workers.map((worker) => (
            <li key={worker.id} className="flex justify-between items-center border-b pb-2">
              <span className="text-card-foreground font-medium">{worker.name}</span>
              <Link href={`/workers/${worker.id}`} className="text-sm text-blue-600 hover:underline">
                View Profile
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
