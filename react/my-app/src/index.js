import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {ServerApp} from "./ServerApp";

ReactDOM.hydrateRoot(document, <ServerApp />);
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<AppWithSuspense />);

