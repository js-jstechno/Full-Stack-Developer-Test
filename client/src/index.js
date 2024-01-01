import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import { I18nextProvider } from 'react-i18next';
// import i18n from 'i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';
// import XHR from 'i18next-xhr-backend';

const root = ReactDOM.createRoot(document.getElementById('root'));
// i18n
//   .use(XHR)
//   .use(LanguageDetector)
//   .init({
//     fallbackLng: 'en',
//     ns: ['translations'],
//     defaultNS: 'translations',
//     keySeparator: false,
//     interpolation: {
//       escapeValue: false,
//     },
//     react: {
//       wait: true,
//     },
//   });

root.render(
  <React.StrictMode>
      

    <App />
     
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
