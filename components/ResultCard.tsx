import React, { useState } from 'react';
import { Copy, Check, Palette, Camera, Hash, AlignLeft } from 'lucide-react';
import { AnalysisResult } from '../types';

interface ResultCardProps {
  result: AnalysisResult;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-12 space-y-6 animate-fade-in-up pb-16">
      <div className="flex items-center space-x-2 mb-4">
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent flex-1" />
        <span className="text-slate-500 text-sm uppercase tracking-wider font-semibold">Analysis Results</span>
        <div className="h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent flex-1" />
      </div>

      {/* Artistic Style Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400">
            <Palette size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">Artistic Style</h3>
            <p className="text-indigo-200 text-lg font-medium">{result.artisticStyle}</p>
          </div>
        </div>
      </div>

      {/* Composition Section */}
      <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 backdrop-blur-sm">
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
            <Camera size={24} />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">Composition & Technical</h3>
            <p className="text-slate-300">{result.composition}</p>
          </div>
        </div>
      </div>

      {/* Prompt Section */}
      <div className="bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-slate-700 bg-slate-800/80">
          <div className="flex items-center space-x-3">
            <AlignLeft className="text-emerald-400" size={20} />
            <h3 className="text-white font-semibold">Generation Prompt</h3>
          </div>
          <button
            onClick={() => copyToClipboard(result.prompt, 'prompt')}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
              copiedField === 'prompt'
                ? 'bg-emerald-500/20 text-emerald-400'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-300'
            }`}
          >
            {copiedField === 'prompt' ? <Check size={16} /> : <Copy size={16} />}
            <span>{copiedField === 'prompt' ? 'Copied!' : 'Copy Prompt'}</span>
          </button>
        </div>
        <div className="p-6">
          <p className="text-slate-300 leading-relaxed font-mono text-sm whitespace-pre-wrap">
            {result.prompt}
          </p>
        </div>
      </div>

      {/* Keywords Section */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Hash className="text-pink-400" size={20} />
          <h3 className="text-white font-semibold">Style Keywords</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {result.keywords.map((keyword, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-full text-slate-300 text-sm hover:border-pink-500/50 hover:text-pink-200 transition-colors cursor-default"
            >
              {keyword}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
