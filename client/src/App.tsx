import React from 'react';
import { AppRouter } from './routes/AppRouter';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <AppRouter />
    </div>
  );
};

export default App;
