import React from 'react';
import { useAppStore } from '../store/useAppStore';

export const Home: React.FC = () => {
  const { createNewProject, projects, setCurrentProject } = useAppStore();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6" dir="rtl">
      <h1 className="text-4xl font-bold mb-2 text-indigo-400">Studio Yaniv</h1>
      <p className="text-gray-400 mb-8 text-center">יצירה ועריכה של תמונות וסרטוני AI</p>

      <button
        onClick={createNewProject}
        className="w-full max-w-sm py-4 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-lg shadow-lg transition-all mb-8 active:scale-95"
      >
        + פרויקט חדש
      </button>

      <div className="w-full max-w-sm">
        <h2 className="text-xl font-semibold mb-4 text-gray-300">פרויקטים אחרונים</h2>
        
        {projects.length === 0 ? (
          <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-800 text-center">
            <p className="text-gray-500 text-sm">אין פרויקטים שמורים עדיין</p>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => setCurrentProject(project)}
                className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg cursor-pointer border border-gray-700 transition-all flex justify-between items-center active:scale-98"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-white">{project.name}</span>
                  <span className="text-xs text-gray-400">
                    {project.mediaType === 'video' ? '🎥 וידאו' : project.mediaType === 'image' ? '🖼️ תמונה' : 'טקסט בלבד'}
                  </span>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(project.updatedAt).toLocaleDateString('he-IL')}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
