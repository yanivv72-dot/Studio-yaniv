import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';

export const Workspace: React.FC = () => {
  const { currentProject, updateCurrentProject, setActiveScreen, isUnsaved, setUnsaved } = useAppStore();
  const [isGenerating, setIsGenerating] = useState(false);

  if (!currentProject) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'image' | 'video') => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      updateCurrentProject({ mediaUrl: url, mediaType: type });
    }
  };

  const handleGenerateAI = async () => {
    if (!currentProject.prompt) return;
    setIsGenerating(true);
    
    setTimeout(() => {
      updateCurrentProject({
        aiResultUrl: currentProject.mediaUrl || 'https://via.placeholder.com/600x400?text=AI+Generated+Result',
      });
      setIsGenerating(false);
      setUnsaved(false);
    }, 3000);
  };

  const handleExport = () => {
    if (!currentProject.aiResultUrl && !currentProject.mediaUrl) return;
    const link = document.createElement('a');
    link.href = currentProject.aiResultUrl || currentProject.mediaUrl || '';
    link.download = `${currentProject.name}.${currentProject.mediaType === 'video' ? 'mp4' : 'png'}`;
    link.click();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-950 text-white" dir="rtl">
      <header className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-800">
        <button onClick={() => setActiveScreen('home')} className="text-gray-400 hover:text-white">
          ← חזרה
        </button>
        <h1 className="font-bold text-lg">{currentProject.name}</h1>
        <span className={`text-xs px-2 py-1 rounded ${isUnsaved ? 'bg-yellow-600' : 'bg-green-600'}`}>
          {isUnsaved ? 'שינויים לא שמורים' : 'נשמר'}
        </span>
      </header>

      <main className="flex-1 flex items-center justify-center p-4 bg-black">
        {currentProject.aiResultUrl || currentProject.mediaUrl ? (
          currentProject.mediaType === 'video' ? (
            <video src={currentProject.aiResultUrl || currentProject.mediaUrl!} controls className="max-h-full max-w-full rounded-lg" />
          ) : (
            <img src={currentProject.aiResultUrl || currentProject.mediaUrl!} alt="Preview" className="max-h-full max-w-full object-contain rounded-lg" />
          )
        ) : (
          <div className="text-gray-600 text-center">טען מדיה או הזן Prompt ליצירה</div>
        )}
      </main>

      <footer className="p-4 bg-gray-900 border-t border-gray-800 flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={currentProject.prompt}
            onChange={(e) => updateCurrentProject({ prompt: e.target.value })}
            placeholder="הזן תיאור ליצירת AI (Prompt)..."
            className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500"
          />
          <button
            onClick={handleGenerateAI}
            disabled={isGenerating || !currentProject.prompt}
            className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-gray-700 px-6 py-2 rounded-lg font-bold transition-all"
          >
            {isGenerating ? 'יוצר...' : 'צור AI'}
          </button>
        </div>

        <div className="flex justify-between items-center gap-2 pt-2">
          <div className="flex gap-2">
            <label className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg cursor-pointer text-sm border border-gray-700">
              🖼️ תמונה
              <input type="file" accept="image/*" className="hidden" onChange={(e) => handleFileUpload(e, 'image')} />
            </label>
            <label className="bg-gray-800 hover:bg-gray-700 px-3 py-2 rounded-lg cursor-pointer text-sm border border-gray-700">
              🎥 וידאו
              <input type="file" accept="video/*" className="hidden" onChange={(e) => handleFileUpload(e, 'video')} />
            </label>
          </div>

          <button
            onClick={handleExport}
            disabled={!currentProject.aiResultUrl && !currentProject.mediaUrl}
            className="bg-green-600 hover:bg-green-500 disabled:bg-gray-800 px-4 py-2 rounded-lg font-semibold text-sm transition-all"
          >
            ⬇️ ייצוא
          </button>
        </div>
      </footer>
    </div>
  );
};
