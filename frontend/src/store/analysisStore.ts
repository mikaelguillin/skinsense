import { create } from "zustand";

export interface SkinTone {
  r: number;
  g: number;
  b: number;
  hex: string;
}

export interface AnalysisResult {
  faces_detected: number;
  skin_tone: SkinTone;
  interpretation: string;
}

interface AnalysisState {
  isUploading: boolean;
  isAnalyzing: boolean;
  result: AnalysisResult | null;
  error: string | null;
  uploadedImage: string | null;

  setUploading: (uploading: boolean) => void;
  setAnalyzing: (analyzing: boolean) => void;
  setResult: (result: AnalysisResult) => void;
  setError: (error: string | null) => void;
  setUploadedImage: (image: string | null) => void;
  reset: () => void;
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  isUploading: false,
  isAnalyzing: false,
  result: null,
  error: null,
  uploadedImage: null,

  setUploading: (uploading) => set({ isUploading: uploading }),
  setAnalyzing: (analyzing) => set({ isAnalyzing: analyzing }),
  setResult: (result) => set({ result, error: null }),
  setError: (error) => set({ error, result: null }),
  setUploadedImage: (image) => set({ uploadedImage: image }),
  reset: () =>
    set({
      isUploading: false,
      isAnalyzing: false,
      result: null,
      error: null,
      uploadedImage: null,
    }),
}));

