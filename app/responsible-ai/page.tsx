"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ResponsibleAIPolicies() {
  const router = useRouter()

  return (
    <main className="container mx-auto px-6 py-10 max-w-3xl bg-card shadow-md rounded-lg">
      
      <div className="flex items-center mb-6">
        <button onClick={() => router.back()} className="flex items-center text-primary hover:underline">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
      </div>

     
      <h1 className="text-3xl font-bold text-center text-primary mb-8">Responsible AI Policies</h1>
      
      
      <p className="mb-6 text-lg text-card-foreground leading-relaxed">
        InclusivAI is committed to the **ethical and responsible use of artificial intelligence** in employment coaching. 
        Our AI models are trained on **Azure Machine Learning** and while they aim for accuracy, they may **make mistakes**.
        Users should always review AI-generated outputs carefully.
      </p>

     
      <h2 className="text-2xl font-semibold text-primary mb-4">Guiding Principles</h2>
      <ul className="list-disc pl-6 space-y-3 text-card-foreground">
        <li><strong>Fairness:</strong> Our AI models are built to reduce biases and provide equal treatment.</li>
        <li><strong>Transparency:</strong> We disclose when AI is being used and how decisions are made.</li>
        <li><strong>Privacy & Security:</strong> User data is encrypted, stored securely, and never shared without consent.</li>
        <li><strong>Accountability:</strong> We monitor AI performance and take responsibility for AI-driven recommendations.</li>
        <li><strong>Continuous Improvement:</strong> Our models are regularly updated to improve accuracy and reduce biases.</li>
      </ul>

      
      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">How We Use AI</h2>
      <p className="text-card-foreground leading-relaxed">
        InclusivAI utilizes AI for:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-card-foreground">
        <li>**Speech-to-text transcription** for employment coaching sessions.</li>
        <li>**Automated document processing** to assist with administrative tasks.</li>
        <li>**Data analysis** to provide insights and efficiency improvements.</li>
      </ul>

      
      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">AI Responsibility & Risks</h2>
      <p className="text-card-foreground leading-relaxed">
        AI systems are **not infallible** and can generate incorrect or biased outputs. Users must ensure they **review, verify, 
        and correct** any critical information before acting on AI-generated insights.
      </p>

      
      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">Your Rights</h2>
      <p className="text-card-foreground leading-relaxed">
        Users have full control over their data. You may request:
      </p>
      <ul className="list-disc pl-6 space-y-2 text-card-foreground">
        <li>Access to AI-generated data related to you.</li>
        <li>Corrections to inaccurate AI-generated content.</li>
        <li>Deletion of your personal data upon request.</li>
      </ul>

      
      <h2 className="text-2xl font-semibold text-primary mt-8 mb-4">Contact Us</h2>
      <p className="text-card-foreground leading-relaxed">
        For concerns regarding AI ethics, privacy, or data management, please contact us at:
        <br />
        <a href="mailto:support@inclusivai.com" className="text-primary font-medium hover:underline">
          support@inclusivai.com
        </a>
      </p>

     
      <div className="h-10"></div>
    </main>
  )
}
