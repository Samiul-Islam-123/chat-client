import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from '@clerk/clerk-react';
import { SocketProvider } from './Contexts/SocketProvider';
import { CurrentConversationProvider } from './Contexts/CurrentConversationProvider';

const PUBLISHABLE_KEY = `pk_test_d29ya2luZy10aWdlci0yNS5jbGVyay5hY2NvdW50cy5kZXYk`;

ReactDOM.render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <BrowserRouter>
      <SocketProvider>
        <CurrentConversationProvider>
          <App />
        </CurrentConversationProvider>
      </SocketProvider>
    </BrowserRouter>
  </ClerkProvider>,
  document.getElementById('root')
);

reportWebVitals();
