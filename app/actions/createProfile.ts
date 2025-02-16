"use server"

import { ConsoleLogWriter } from "drizzle-orm"

/*
import { OpenAI } from "openai"
import { put } from "@vercel/blob"
import { db } from "@/db/index"
import { profiles } from "@/db/schema"


// Assuming you have these types defined elsewhere
*/

import type { FormData } from "@/app/types/formData"


export async function createProfile(data: FormData, wallet: string | undefined) {
  try {
    // Step 1: Receive form data, wallet, and resume file
    console.log("Received data:", data, "Wallet:", wallet)


    // Step 2: Turn the file into text
    if (data.resume) {
      const resumeText = await data.resume.text()
      console.log(resumeText)
    } else {
      console.log("No resume file provided")
    }
/*
    // Step 3 & 4: Create the main string and 'items' string for DALL-E prompt
    const mainPrompt = createDallePrompt(data)

    // Step 4: Send prompt to OpenAI API
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
    const image = await openai.images.generate({ model: "dall-e-3", prompt: mainPrompt })
    const imageUrl = image.data[0].url

    if (!imageUrl) {
      throw new Error("Failed to generate image")
    }

    // Step 5: Turn the image into a blob
    const imageResponse = await fetch(imageUrl)
    const imageBlob = await imageResponse.blob()

    // Step 6: Store blob on Vercel blob
    const { url: blobUrl } = await put(`profile-images/${wallet}.png`, imageBlob, { access: "public" })

    // Step 7: Send data to the database
    await db.insert(profiles).values({
      wallet,
      alias: data.alias,
      hourlyRate: data.hourlyRate,
      interviewRate: data.interviewRate,
      resumeText,
      blobUrl,
      careerField: data.careerField,
      yearsOfExperience: data.yearsOfExperience,
      clearanceLevel: data.clearanceLevel,
      education: data.education,
    })

    */

    // Step 8: Return success
    return { success: true }
  } catch (error) {
    console.error("Error in createProfile:", error)
    return { success: false, error: (error as Error).message }
  }
}

function createDallePrompt(data: FormData): string {
  const mainStringArray: string[] = []
  const mainItemArray: string[] = []

  // Career field
  switch (data.careerField) {
    case "Developer":
    case "DevOps":
    case "Sys Admin":
      mainStringArray.push("cat")
      break
    case "IT Recruiter":
    case "Project Manager":
      mainStringArray.push("dog")
      break
    case "AI/ML Engineer":
      mainStringArray.push("owl")
      break
    case "Database Engineer":
      mainStringArray.push("squirrel")
      break
    case "Cybersecurity Engineer":
      mainStringArray.push("fox")
      break
    case "Cloud Engineer":
      mainStringArray.push("bird")
      break
    default:
      mainStringArray.push("raccoon")
  }

  // Years of experience
  const yoe = Number(data.yearsOfExperience)
  if (yoe < 3) {
    mainStringArray.push("a baby")
  } else if (yoe < 6) {
    mainStringArray.push("a teenager")
  } else if (yoe < 8) {
    mainStringArray.push("a young adult")
  } else if (yoe < 11) {
    mainStringArray.push("an adult")
  } else if (yoe < 16) {
    mainStringArray.push("an older adult")
  } else {
    mainStringArray.push("an ancient wizard")
  }

  // Clearance level
  switch (data.clearanceLevel) {
    case "None":
      mainItemArray.push("leather necklace")
      break
    case "Public Trust":
      mainItemArray.push("silver necklace")
      break
    case "Secret":
      mainItemArray.push("gold necklace")
      break
    case "Top Secret":
      mainItemArray.push("large purple necklace")
      break
  }

  // Constructing prompt
  const allItems = mainItemArray.join(", ")
  return `A cold wax oil painting of a genius ${mainStringArray[0]}. This ${mainStringArray[0]} is ${mainStringArray[1]}. The ${mainStringArray[0]} has or is holding a ${allItems}.`
}

