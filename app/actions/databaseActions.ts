'use server'
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { pgTable, text } from "drizzle-orm/pg-core";
import { Client } from "pg";


export default async function PrintDataTest(){
  const client = new Client({ connectionString: process.env.DATABASE_URL });
  await client.connect();
  const db = drizzle(client);
  
  const resumeTable = pgTable("resume-table", {
    xata_id: text("resume"),
  });
  
  const record = await db.select().from(resumeTable).execute();
  console.log(record);
}