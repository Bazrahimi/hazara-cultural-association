import { processEnv } from "@/app/_lib/processEnv";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: processEnv.cloudinary.cloudName,
  api_key: processEnv.cloudinary.apiKey,
  api_secret: processEnv.cloudinary.apiSecret,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paramsToSign } = body;

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      processEnv.cloudinary.apiSecret,
    );

    return Response.json({ signature });
  } catch (error) {
    console.error("Signature API error:", error);
    return new Response("Signature error", { status: 500 });
  }
}
