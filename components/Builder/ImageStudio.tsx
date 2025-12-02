import React, { useState } from 'react';
import { Image as ImageIcon, Wand2, Loader2, Upload } from 'lucide-react';
import { editImageWithGemini } from '../../services/geminiService';

const ImageStudio: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = async () => {
    if (!selectedImage || !prompt) return;
    
    setIsProcessing(true);
    setError('');
    
    try {
      const result = await editImageWithGemini(selectedImage, prompt);
      if (result) {
        setSelectedImage(result);
        setPrompt(''); // Clear prompt after success
      } else {
        setError('Não foi possível processar a imagem. Tente outro prompt.');
      }
    } catch (err) {
      setError('Erro ao conectar com Gemini 2.5 Flash Image.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
            <Wand2 size={18} />
        </div>
        <div>
            <h3 className="font-bold text-slate-900 text-sm">Editor Mágico</h3>
            <p className="text-xs text-slate-400">Powered by Gemini 2.5 Flash Image</p>
        </div>
      </div>

      <div className="relative group">
        <div className={`w-full aspect-square rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center overflow-hidden bg-slate-50 ${!selectedImage ? 'cursor-pointer hover:bg-slate-100' : ''}`}>
           {selectedImage ? (
               <img src={selectedImage} alt="To Edit" className="w-full h-full object-cover" />
           ) : (
               <label className="flex flex-col items-center gap-2 cursor-pointer w-full h-full justify-center">
                   <Upload className="text-slate-400" />
                   <span className="text-xs text-slate-400 font-medium">Upload Imagem</span>
                   <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
               </label>
           )}
        </div>
        
        {selectedImage && !isProcessing && (
            <button 
                onClick={() => setSelectedImage(null)}
                className="absolute top-2 right-2 bg-white/80 backdrop-blur rounded-full p-1 text-slate-600 hover:text-red-500 text-xs shadow-sm"
            >
                Remover
            </button>
        )}
      </div>

      <div className="space-y-3">
          <label className="text-xs font-bold text-slate-500 uppercase">Instrução para a IA</label>
          <textarea 
            className="w-full p-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 outline-none resize-none"
            rows={3}
            placeholder="Ex: 'Adicione um filtro retrô', 'Remova a pessoa no fundo'..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={!selectedImage || isProcessing}
          />
          
          {error && <p className="text-xs text-red-500">{error}</p>}
          
          <button
            onClick={handleEdit}
            disabled={!selectedImage || !prompt || isProcessing}
            className={`w-full py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all
                ${!selectedImage || !prompt || isProcessing 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
                    : 'bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-500/30'}`}
          >
            {isProcessing ? (
                <>
                    <Loader2 size={16} className="animate-spin" />
                    Processando...
                </>
            ) : (
                <>
                    <Wand2 size={16} />
                    Gerar Edição
                </>
            )}
          </button>
      </div>
      
      <div className="text-[10px] text-slate-400 text-center leading-tight">
          Usa o modelo Gemini 2.5 Flash Image ("Nano Banana") para edição.
      </div>
    </div>
  );
};

export default ImageStudio;