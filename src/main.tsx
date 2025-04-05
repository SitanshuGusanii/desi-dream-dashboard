
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Get the base URL from the environment or use '/' as default
const basename = import.meta.env.BASE_URL || '/';

createRoot(document.getElementById("root")!).render(
  <App />
);
