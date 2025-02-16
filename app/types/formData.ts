import type React from "react"
export type FormData = {
  alias: string
  careerField: string
  yearsOfExperience: number
  clearanceLevel: string
  interviewRate: number
  hourlyRate: number
  education: string
  resume: File | null
}

// Common Next.js types
export type NextPageProps = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export type LayoutProps = {
  children: React.ReactNode
}

export type MetadataProps = {
  params: { [key: string]: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

// API response type
export type ApiResponse<T> = {
  data: T | null
  error: string | null
}

// User type (example)
export type User = {
  id: string
  name: string
  email: string
}

