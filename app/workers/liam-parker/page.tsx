"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"

export default function LiamParkerProfile() {
  const router = useRouter()

  return (
    <main className="container mx-auto px-6 py-10 max-w-3xl bg-card shadow-md rounded-lg">
      {/* 🔙 Botón de volver */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-primary hover:underline"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
        <h1 className="text-2xl font-bold text-primary">Worker Profile</h1>
      </div>

      {/* 👤 Información del trabajador */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold text-card-foreground mb-2">Liam Parker</h2>
        <p className="text-sm text-muted-foreground mb-4">Worker ID: W-2025-LP01</p>

        <div className="space-y-4 text-card-foreground text-sm leading-relaxed">
          <p>
            Liam Parker recently joined <strong>Vertex Solutions</strong> as an administrative assistant at
            <strong> 320 P Street NW, Washington, D.C., 20007</strong>. He started on <strong>January 10, 2025</strong>, 
            working a full-time schedule of <strong>40 hours per week</strong>, Monday through Friday. 
            His hourly wage is <strong>$23.75</strong>, and his employment authorization number is <strong>76543-DC</strong>.
          </p>

          <p>
            Liam lives in <strong>Alexandria, Virginia</strong>, and commutes to work using the <strong>Washington Metro</strong>, 
            as he does not own a car and his office does not provide private parking. 
            His working hours are from <strong>8:00 a.m. to 4:00 p.m.</strong>, and he is not required to work nights or weekends.
          </p>

          <p>
            His benefits package includes <strong>paid sick leave</strong>, <strong>medical and dental insurance</strong>, 
            and <strong>employee discounts</strong> at fitness centers and partnered retailers. 
            Additionally, Vertex Solutions provides <strong>complimentary lunches</strong> in the office cafeteria, 
            helping employees reduce their daily expenses.
          </p>

          <p>
            Liam works in a <strong>modern, open-plan office</strong> where he collaborates with colleagues and interacts with clients. 
            His workload is typically moderate, though it can become more fast-paced during project deadlines.
          </p>

          <p>
            His supervisor, <strong>Rachel Adams</strong>, evaluated his performance after the first month and praised 
            his reliability and strong attention to detail. However, she advised him to improve in handling unexpected 
            task changes and enhance his task prioritization skills.
          </p>

          <p>
            To support his professional development, Liam will participate in training programs focused on 
            <strong>workflow optimization</strong> and <strong>organizational skills</strong>. With the help of his teammates, 
            he is eager to refine his skills and grow within Vertex Solutions.
          </p>

          <p>
            His employment is facilitated by <strong>CareerBoost Employment Services</strong>, which serves as his provider. 
            His performance is reviewed every six months as part of the reporting period. 
            He also receives professional guidance from his vocational rehabilitation (VR) specialist, 
            <strong>David Carter</strong>, who supports his career growth and skill development.
          </p>
        </div>
      </div>
    </main>
  )
}
