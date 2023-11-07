import type { Metadata } from 'next'
import './globals.css'
import AppLayoutWrapper from '@/components/AppLayoutWrapper'

export const metadata: Metadata = {
  title: 'Anihub',
  description: 'Find all the anime here',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='bg-bgColor'>
          <AppLayoutWrapper>
            {children}
          </AppLayoutWrapper>
      </body>
    </html>
  )
}
