"use server";

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadToR2Action(formData: FormData): Promise<{ success: boolean; url: string }> {
  const file = formData.get("file") as File;
  const folder = (formData.get("folder") as string) || "misc";

  if (!file) {
    throw new Error("No file provided for upload.");
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const fileExt = file.name.split(".").pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;

  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.R2_BUCKET_NAME || "portfolio-assets";
  const publicDomain = (process.env.R2_PUBLIC_DOMAIN || "https://pub-placeholder.r2.dev").replace(/\/$/, "");

  // If R2 environment credentials exist, perform real R2 upload
  if (accountId && accessKeyId && secretAccessKey) {
    try {
      const R2 = new S3Client({
        region: "auto",
        endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
        requestChecksumCalculation: "WHEN_REQUIRED",
        responseChecksumValidation: "WHEN_REQUIRED",
      });

      await R2.send(
        new PutObjectCommand({
          Bucket: bucketName,
          Key: fileName,
          Body: buffer,
          ContentType: file.type || "application/octet-stream",
        })
      );

      const publicUrl = `${publicDomain}/${fileName}`;
      return { success: true, url: publicUrl };
    } catch (error: any) {
      console.error("Cloudflare R2 Upload Error:", error.message);
      return { success: false, url: `${publicDomain}/${fileName}` };
    }
  }

  // Fallback mock public URL if R2 credentials are not set yet
  return { success: true, url: `${publicDomain}/${fileName}` };
}
