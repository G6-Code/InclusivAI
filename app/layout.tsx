import type { Metadata } from "next"
import Image from "next/image"
import "./globals.css"

export const metadata: Metadata = {
  title: "InclusivAI v1 App",
  description: "Created with v1",
  generator: "v1.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-background text-foreground min-h-screen">
      <body className="min-h-screen flex flex-col">
        
        <header className="p-4">
          <Image
            src="/images/placeholder-logo1.png"
            alt="InclusivAI Logo"
            width={200}
            height={65}
            className="mx-auto rounded-md shadow-sm border border-gray-300 p-2"
            priority
          />
        </header>

        
        <main className="flex-1 container mx-auto">
          {children}
        </main>
      </body>
    </html>
  )
}
