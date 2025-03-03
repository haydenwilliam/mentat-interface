
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Prevent default browser behaviors in Electron
if (window.navigator.userAgent.toLowerCase().includes('electron')) {
  document.addEventListener('dragover', (event) => event.preventDefault());
  document.addEventListener('drop', (event) => event.preventDefault());
}

createRoot(document.getElementById("root")!).render(<App />);
