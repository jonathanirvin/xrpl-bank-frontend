import { defineCustomElements } from '@ionic/pwa-elements/loader';
import { createRoot } from 'react-dom/client';
import App from './App';
defineCustomElements(window);
const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <App />
);