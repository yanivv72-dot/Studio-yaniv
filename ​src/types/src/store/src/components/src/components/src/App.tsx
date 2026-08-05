import React from 'react';
import { useAppStore } from './store/useAppStore';
import { Home } from './components/Home';
import { Workspace } from './components/Workspace';

export const App: React.FC = () => {
  const { activeScreen } = useAppStore();

  return (
    <div className="w-full h-screen font-sans bg-black">
      {activeScreen === 'home' && <Home />}
      {activeScreen === 'workspace' && <Workspace />}
    </div>
  );
};

export default App;
