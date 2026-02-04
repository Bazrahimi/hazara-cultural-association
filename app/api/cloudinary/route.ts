import { publicEnv } from "@/app/_lib/env/public";
import { serverEnv } from "@/app/_lib/env/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: publicEnv.cloudinaryCloudName,
  api_key: publicEnv.cloudinaryApiKey,
  api_secret: serverEnv.cloudinary.apiSecret,
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { paramsToSign } = body;

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      serverEnv.cloudinary.apiSecret,
    );

    return Response.json({ signature });
  } catch (error) {
    console.error("Signature API error:", error);
    return new Response("Signature error", { status: 500 });
  }
}
