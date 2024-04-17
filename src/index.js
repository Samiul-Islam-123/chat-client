import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom"
import { CurrentConversationProvider } from './Contexts/CurrentConversationProvider';

import { ClerkProvider } from '@clerk/clerk-react'


const PUBLISHABLE_KEY = `pk_test_d29ya2luZy10aWdlci0yNS5jbGVyay5hY2NvdW50cy5kZXYk`


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>


        <BrowserRouter>
            <CurrentConversationProvider>

                <App />
            </CurrentConversationProvider>
        </BrowserRouter>
    </ClerkProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
