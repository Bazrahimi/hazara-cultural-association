import { apiKey, apiSecret, cloudName } from "@/app/lib/cloudinary";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paramsToSign } = body;

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!
    );

    return Response.json({ signature });
  } catch (error) {
    console.error("Signature API error:", error);
    return new Response("Signature error", { status: 500 });
  }
}
