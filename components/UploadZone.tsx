import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { ImageFile } from '../types';

interface UploadZoneProps {
  onImageSelected: (image: ImageFile | null) => void;
  selectedImage: ImageFile | null;
  disabled: boolean;
}

const UploadZone: React.FC<UploadZoneProps> = ({ onImageSelected, selectedImage, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    processFile(file);
  };

  const processFile = (file: File | undefined) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // Extract base64 content without the prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      
      onImageSelected({
        file,
        previewUrl: result,
        base64,
        mimeType: file.type,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  const handleRemove = () => {
    onImageSelected(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  if (selectedImage) {
    return (
      <div className="relative w-full max-w-xl mx-auto mt-8 group rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700">
        <img 
          src={selectedImage.previewUrl} 
          alt="Preview" 
          className="w-full h-auto max-h-[500px] object-contain bg-slate-800"
        />
        {!disabled && (
          <button 
            onClick={handleRemove}
            className="absolute top-4 right-4 p-2 bg-red-500/80 hover:bg-red-600 text-white rounded-full backdrop-blur-md transition-all transform hover:scale-110"
            title="Remove image"
          >
            <X size={20} />
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-8">
      <div
        className={`relative border-2 border-dashed rounded-3xl p-12 transition-all duration-300 ease-in-out cursor-pointer flex flex-col items-center justify-center text-center
          ${isDragging 
            ? 'border-indigo-500 bg-indigo-500/10 scale-[1.02]' 
            : 'border-slate-700 hover:border-indigo-400 hover:bg-slate-800/50 bg-slate-800/20'
          }
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
          disabled={disabled}
        />
        
        <div className="p-4 bg-slate-800 rounded-full mb-4 shadow-xl shadow-indigo-500/5 ring-1 ring-slate-700 group-hover:ring-indigo-500/50 transition-all">
          <Upload className={`w-8 h-8 ${isDragging ? 'text-indigo-400' : 'text-slate-400'}`} />
        </div>
        
        <h3 className="text-xl font-semibold text-slate-200 mb-2">
          Upload an Image
        </h3>
        <p className="text-slate-400 text-sm max-w-xs">
          Drag and drop or click to select an image to analyze its artistic style.
        </p>
      </div>
    </div>
  );
};

export default UploadZone;
