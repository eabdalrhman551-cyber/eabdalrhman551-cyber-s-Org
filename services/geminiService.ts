import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    prompt: {
      type: Type.STRING,
      description: "A highly detailed, descriptive prompt suitable for generating an image in Stable Diffusion or Midjourney that looks exactly like the input image. Describe the subject, action, clothing, environment, lighting, and mood.",
    },
    artisticStyle: {
      type: Type.STRING,
      description: "A concise description of the artistic medium and visual style (e.g., 'Cyberpunk Digital Art', 'Oil Painting on Canvas', 'Hyper-realistic Photography').",
    },
    keywords: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "A list of 5-10 comma-separated keywords useful for tagging or prompting (e.g., 'cinematic lighting, 8k, bokeh, octane render').",
    },
    composition: {
      type: Type.STRING,
      description: "Description of the camera angle, framing, and composition (e.g., 'Low angle shot, rule of thirds, wide depth of field').",
    },
  },
  required: ["prompt", "artisticStyle", "keywords", "composition"],
};

export const analyzeImage = async (base64Data: string, mimeType: string): Promise<AnalysisResult> => {
  try {
    const modelId = "gemini-2.5-flash"; // Efficient for vision tasks

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: "Analyze this image acting as an expert prompt engineer for AI Image Generators. Provide a detailed English description specifically designed to recreate this image's style and content. Focus on the artistic direction, lighting, medium, and composition.",
          },
        ],
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        systemInstruction: "You are an expert art curator and AI prompt engineer. Your goal is to deconstruct images into text prompts that can be used to recreate them. Always output in English.",
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response text received from Gemini.");
    }

    return JSON.parse(text) as AnalysisResult;
  } catch (error) {
    console.error("Error analyzing image:", error);
    throw error;
  }
};
