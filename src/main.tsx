import { Router } from '@/router/Router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Router />
        </BrowserRouter>
    </StrictMode>,
)
