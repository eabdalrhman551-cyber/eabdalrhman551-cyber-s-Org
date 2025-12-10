export interface AnalysisResult {
  prompt: string;
  artisticStyle: string;
  keywords: string[];
  composition: string;
}

export interface ImageFile {
  file: File;
  previewUrl: string;
  base64: string; // The base64 data string (without prefix)
  mimeType: string;
}
