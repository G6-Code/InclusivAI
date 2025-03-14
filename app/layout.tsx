import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'InclusivAI v1 App',
  description: 'Created with v1',
  generator: 'v1.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
