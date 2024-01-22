'use client'
import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

interface TanStackQueryProps {
  children: ReactNode
}

const TanStackQuery = ({ children }: TanStackQueryProps) => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default TanStackQuery
