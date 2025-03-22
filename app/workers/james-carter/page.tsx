"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function JamesCarterProfile() {
  const router = useRouter()

  return (
    <main className="container mx-auto px-6 py-10 max-w-3xl bg-card shadow-md rounded-lg">
      {/* Back Button */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={() => router.back()} className="flex items-center text-primary hover:underline">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
        <h1 className="text-3xl font-bold text-primary">James Carter</h1>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <p><strong>Position:</strong> Administrative Assistant at DataTech Solutions</p>
        <p><strong>Address:</strong> 500 L Street NW, Washington, D.C., 20005</p>
        <p><strong>Start Date:</strong> March 1, 2025</p>
        <p><strong>Schedule:</strong> Full-time, Monday to Friday, 40 hours/week</p>
        <p><strong>Working Hours:</strong> 8:30 a.m. - 4:30 p.m.</p>
        <p><strong>Hourly Wage:</strong> $25.50</p>
        <p><strong>Employment Authorization:</strong> 87456-DC</p>
        <p><strong>Commute:</strong> Uses Washington Metro from Arlington, Virginia. No private parking available.</p>
        <p><strong>Work Environment:</strong> Modern, open-office setting with regular interactions with colleagues and clients.</p>
        <p><strong>Workload:</strong> Manageable but may increase during busy periods.</p>
        <p><strong>Performance Review:</strong> Supervisor Emily Richards noted strong punctuality and organization. Suggested improvements in multitasking and task prioritization.</p>
        <p><strong>Training:</strong> Will attend training in task management and workflow automation.</p>
        <p><strong>Support Services:</strong> Supported by CareerPath Workforce Services. Reviewed quarterly.</p>
        <p><strong>VR Specialist:</strong> Michael Thompson provides career development guidance.</p>
        <p><strong>Benefits:</strong> Paid sick leave, medical and dental insurance, discounts at affiliated gyms and stores, free meals at cafeteria.</p>
      </div>
    </main>
  )
}
