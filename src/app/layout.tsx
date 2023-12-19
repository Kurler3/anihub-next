import type { Metadata } from 'next'
import './globals.css'
import AppLayoutWrapper from '@/components/layout/AppLayoutWrapper'
//👇 Import Open Sans font
import { McLaren } from 'next/font/google'
import LoadingModal from '@/components/ui/LoadingModal'
import { Analytics } from '@vercel/analytics/react';


//👇 Configure our font object
const mcLaren = McLaren({
  subsets: ['latin'],
  weight: '400'
})

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
    <html lang="en" className={`${mcLaren.className} min-w-[428px]`}>
      <body className='bg-bgColor'>
        <LoadingModal />
        <AppLayoutWrapper>
          {children}
        </AppLayoutWrapper>
        <Analytics />
      </body>
    </html>
  )
}
