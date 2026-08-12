import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full bg-[#0c1b75] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
