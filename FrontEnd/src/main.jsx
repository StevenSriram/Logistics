import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// Import Animate On Scroll library
import AOS from 'aos';
import 'aos/dist/aos.css';

// Instantiate AOS
AOS.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
