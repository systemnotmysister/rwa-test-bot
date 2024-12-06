import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './AppContext'; // Импорт AppProvider

import App from './App.tsx';
import './App.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProvider> {/* Оборачиваем приложение в AppProvider */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </AppProvider>

);

export default App;