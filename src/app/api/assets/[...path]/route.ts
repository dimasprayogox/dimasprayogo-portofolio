import { NextRequest, NextResponse } from "next/server";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path } = await params;
  const key = path.join("/");

  const accountId = process.env.R2_ACCOUNT_ID;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.R2_BUCKET_NAME || "dimasprayogo-portofolio";

  if (!accountId || !accessKeyId || !secretAccessKey) {
    return new NextResponse("Storage credentials not configured", { status: 500 });
  }

  const R2 = new S3Client({
    region: "auto",
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  try {
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: key,
    });

    const response = await R2.send(command);

    if (!response.Body) {
      return new NextResponse("Asset not found", { status: 404 });
    }

    const contentType = response.ContentType || "application/octet-stream";
    const byteArray = await response.Body.transformToByteArray();

    return new NextResponse(Buffer.from(byteArray), {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error("Error serving R2 asset:", error);
    return new NextResponse("Asset not found", { status: 404 });
  }
}
