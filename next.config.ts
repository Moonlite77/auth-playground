import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental:{
    serverActions: { allowedOrigins: ["fucking-VERCEL-RIGHT-HERE.app","https://studious-giggle-v6p46jjjq44r3pwq7-3000.app.github.dev/", "localhost:3000"], }
  }
  
};

export default nextConfig;
