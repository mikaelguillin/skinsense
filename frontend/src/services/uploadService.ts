import type { AnalysisResult } from "../store/analysisStore";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export interface UploadResponse {
  status: string;
  data: AnalysisResult;
}

export async function analyzeImage(file: File): Promise<AnalysisResult> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/analyze/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.detail || `HTTP error! status: ${response.status}`
    );
  }

  const result: UploadResponse = await response.json();
  return result.data;
}

export function validateImage(file: File): string | null {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

  if (file.size > maxSize) {
    return "fileTooLarge";
  }

  if (!allowedTypes.includes(file.type)) {
    return "invalidFormat";
  }

  return null;
}
