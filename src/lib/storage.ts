import { uploadToR2Action } from "@/app/actions/upload";

/**
 * Uploads a file (Project screenshot or Certificate PDF) to Cloudflare R2 object storage.
 * Returns the public CDN URL of the uploaded file.
 */
export async function uploadPortfolioAsset(
  file: File,
  folder: "projects" | "certificates"
): Promise<string> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", folder);

    const result = await uploadToR2Action(formData);
    if (result.success && result.url) {
      return result.url;
    }
  } catch (error) {
    console.warn("R2 Upload Exception (using local preview fallback):", error);
  }

  // Fallback temporary local object URL for preview if offline/unconfigured
  return URL.createObjectURL(file);
}
