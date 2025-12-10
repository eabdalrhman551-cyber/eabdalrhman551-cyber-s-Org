import React, { useState } from 'react';
import Header from './components/Header';
import UploadZone from './components/UploadZone';
import ResultCard from './components/ResultCard';
import { analyzeImage } from './services/geminiService';
import { ImageFile, AnalysisResult } from './types';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ImageFile | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelected = (image: ImageFile | null) => {
    setSelectedImage(image);
    setAnalysisResult(null);
    setError(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setLoading(true);
    setError(null);

    try {
      const result = await analyzeImage(selectedImage.base64, selectedImage.mimeType);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze the image. Please check your internet connection or try a different image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-100 flex flex-col">
      <Header />

      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8">
        <div className="text-center mb-8 space-y-2">
          <h2 className="text-2xl font-bold text-white">Unlock the Prompt</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Upload an image to reverse-engineer its style. Get a detailed prompt and artistic breakdown to recreate it with AI.
          </p>
        </div>

        <UploadZone 
          onImageSelected={handleImageSelected} 
          selectedImage={selectedImage}
          disabled={loading}
        />

        {error && (
          <div className="max-w-xl mx-auto mt-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center space-x-3 text-red-200">
            <AlertCircle className="flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div className="flex justify-center mt-8">
          {selectedImage && !analysisResult && (
            <button
              onClick={handleAnalyze}
              disabled={loading}
              className={`
                group relative px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-indigo-900/20 transition-all transform
                ${loading 
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white hover:scale-105 active:scale-95'
                }
              `}
            >
              <div className="flex items-center space-x-2">
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    <span>Analyzing Image...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="group-hover:text-yellow-300 transition-colors" />
                    <span>Generate Prompt</span>
                  </>
                )}
              </div>
            </button>
          )}
        </div>

        {analysisResult && (
           <ResultCard result={analysisResult} />
        )}
      </main>

      <footer className="w-full py-6 border-t border-slate-800 mt-auto text-center text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Photographer AI. Powered by Google Gemini.</p>
      </footer>
    </div>
  );
};

export default App;
