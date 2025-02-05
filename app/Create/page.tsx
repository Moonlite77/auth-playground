"use client"

import { useState, useEffect, useCallback } from "react"
import { useForm, Controller } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useActiveAccount } from "thirdweb/react"
import { useDropzone } from "react-dropzone"

type FormData = {
  alias: string
  careerField: string
  yearsOfExperience: number
  clearanceLevel: string
  interviewRate: number
  hourlyRate: number
  education: string
  resume: File | null
}

const careerFields = [
  "Developer",
  "DevOps",
  "Sys Admin",
  "IT Recruiter",
  "Project Manager",
  "AI/ML Engineer",
  "Database Engineer",
  "Cybersecurity Engineer",
  "Cloud Engineer",
]

const clearanceLevels = ["None", "Public Trust", "Secret", "Top Secret"]

const educationLevels = ["High School", "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Ph.D.", "Other"]

const MAX_FILE_SIZE = 500 * 1024 // 500KB in bytes

export default function CreatePage() {
  const router = useRouter()
  const userWallet = useActiveAccount()
  const [walletAddress, setWalletAddress] = useState<string | undefined>(undefined)
  const [step, setStep] = useState(1)
  const [fileSize, setFileSize] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle")
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>()

  useEffect(() => {
    if (userWallet?.address) {
      setWalletAddress(userWallet.address)
    }
  }, [userWallet])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0]
      if (file) {
        if (file.size <= MAX_FILE_SIZE) {
          setValue("resume", file)
          setFileSize(file.size)
        } else {
          alert("Resume exceeds 500KB. Please upload a two page resume.")
        }
      }
    },
    [setValue],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/plain": [".txt"],
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
    maxFiles: 1,
    maxSize: MAX_FILE_SIZE,
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setStep(10) // Move to the submission status step

    const dataWithWallet = {
      ...data,
      walletAddress,
    }
    console.log("Form data with wallet:", dataWithWallet)

    // Simulate network request
    await new Promise((resolve) => setTimeout(resolve, 30000)) // 1 minute delay

    // Simulate success (you can add your own logic here for actual submission)
    const isSuccess = Math.random() > 0.1 // 90% success rate for demonstration

    setSubmissionStatus(isSuccess ? "success" : "error")

    // Wait for 2 seconds before redirecting
    setTimeout(() => {
      router.push("/TalentVault")
    }, 2000)
  }

  const nextStep = () => setStep(step + 1)
  const prevStep = () => setStep(step - 1)

  const watchedFields = watch()

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Create Profile</CardTitle>
          {walletAddress && <p className="text-sm text-gray-500">Connected Wallet: {walletAddress}</p>}
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            {step === 1 && (
              <div className="space-y-4">
                <Label htmlFor="alias">Alias</Label>
                <Input
                  id="alias"
                  {...register("alias", { required: "Alias is required" })}
                  placeholder="Enter your alias"
                />
                {errors.alias && <p className="text-red-500">{errors.alias.message}</p>}
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <Label htmlFor="careerField">Career Field</Label>
                <Controller
                  name="careerField"
                  control={control}
                  rules={{ required: "Career field is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your career field" />
                      </SelectTrigger>
                      <SelectContent>
                        {careerFields.map((field) => (
                          <SelectItem key={field} value={field}>
                            {field}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.careerField && <p className="text-red-500">{errors.careerField.message}</p>}
              </div>
            )}

            {step === 3 && (
              <div className="space-y-4">
                <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                <Input
                  id="yearsOfExperience"
                  type="number"
                  {...register("yearsOfExperience", {
                    required: "Years of experience is required",
                    min: { value: 0, message: "Years of experience must be 0 or greater" },
                    max: { value: 100, message: "Years of experience must be 100 or less" },
                  })}
                  placeholder="Enter years of experience"
                />
                {errors.yearsOfExperience && <p className="text-red-500">{errors.yearsOfExperience.message}</p>}
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4">
                <Label>Clearance Level</Label>
                <Controller
                  name="clearanceLevel"
                  control={control}
                  rules={{ required: "Clearance level is required" }}
                  render={({ field }) => (
                    <RadioGroup onValueChange={field.onChange} value={field.value}>
                      {clearanceLevels.map((level) => (
                        <div key={level} className="flex items-center space-x-2">
                          <RadioGroupItem value={level} id={level} />
                          <Label htmlFor={level}>{level}</Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.clearanceLevel && <p className="text-red-500">{errors.clearanceLevel.message}</p>}
              </div>
            )}

            {step === 5 && (
              <div className="space-y-4">
                <Label htmlFor="interviewRate">
                  How much will you charge a recruiter if they want an interview with you? (USD)
                </Label>
                <Input
                  id="interviewRate"
                  type="number"
                  {...register("interviewRate", {
                    required: "Interview rate is required",
                    min: { value: 0, message: "Interview rate must be 0 or greater" },
                  })}
                  placeholder="Enter your interview rate"
                />
                {errors.interviewRate && <p className="text-red-500">{errors.interviewRate.message}</p>}
              </div>
            )}

            {step === 6 && (
              <div className="space-y-4">
                <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                <Input
                  id="hourlyRate"
                  type="number"
                  {...register("hourlyRate", {
                    required: "Hourly rate is required",
                    min: { value: 0, message: "Hourly rate must be 0 or greater" },
                  })}
                  placeholder="Enter your hourly rate"
                />
                {errors.hourlyRate && <p className="text-red-500">{errors.hourlyRate.message}</p>}
              </div>
            )}

            {step === 7 && (
              <div className="space-y-4">
                <Label htmlFor="education">Education</Label>
                <Controller
                  name="education"
                  control={control}
                  rules={{ required: "Education is required" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your education level" />
                      </SelectTrigger>
                      <SelectContent>
                        {educationLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.education && <p className="text-red-500">{errors.education.message}</p>}
              </div>
            )}

            {step === 8 && (
              <div className="space-y-4">
                <Label htmlFor="resume">Resume (Max 500KB)</Label>
                <div
                  {...getRootProps()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <p>Drop the resume here ...</p>
                  ) : (
                    <p>Drag 'n' drop your resume here, or click to select a file</p>
                  )}
                </div>
                {watch("resume") && (
                  <p className="text-sm text-gray-500">
                    File: {watch("resume")?.name ?? "No file selected"} ({(fileSize / 1024).toFixed(2)} KB)
                  </p>
                )}
                {errors.resume && <p className="text-red-500">{errors.resume.message}</p>}
              </div>
            )}

            {step === 9 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Summary</h3>
                <p>
                  <strong>Alias:</strong> {watchedFields.alias}
                </p>
                <p>
                  <strong>Career Field:</strong> {watchedFields.careerField}
                </p>
                <p>
                  <strong>Years of Experience:</strong> {watchedFields.yearsOfExperience}
                </p>
                <p>
                  <strong>Clearance Level:</strong> {watchedFields.clearanceLevel}
                </p>
                <p>
                  <strong>Interview Rate:</strong> ${watchedFields.interviewRate}
                </p>
                <p>
                  <strong>Hourly Rate:</strong> ${watchedFields.hourlyRate}
                </p>
                <p>
                  <strong>Education:</strong> {watchedFields.education}
                </p>
                <p>
                  <strong>Resume:</strong> {watchedFields.resume ? watchedFields.resume.name : "Not uploaded"}
                </p>
              </div>
            )}

            {step === 10 && (
              <div className="space-y-4 text-center">
                <h3 className="text-lg font-semibold">Submission Status</h3>
                {isSubmitting && submissionStatus === "idle" && (
                  <p>Submitting your profile... This may take up to a minute.</p>
                )}
                {submissionStatus === "success" && (
                  <p className="text-green-600">Success! Redirecting to Talent Vault...</p>
                )}
                {submissionStatus === "error" && (
                  <p className="text-red-600">Submission unsuccessful. Please try again later.</p>
                )}
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {step > 1 && step < 10 && (
            <Button onClick={prevStep} variant="outline">
              Previous
            </Button>
          )}
          {step < 9 ? (
            <Button onClick={nextStep}>Next</Button>
          ) : step === 9 ? (
            <Button onClick={handleSubmit(onSubmit)} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>
          ) : null}
        </CardFooter>
      </Card>
    </div>
  )
}

