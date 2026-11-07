import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './style.css';
import './styles/home-cinematic.css';

const root=document.getElementById('root');
if(!root)throw new Error('APP_ROOT_MISSING');
createRoot(root).render(<StrictMode><App/></StrictMode>);
