import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import ProjectsProvider from './context/ProjectsContext/ProjectsProvider';
import CategoriesProvider from './context/CategoriesContext/CategoriesProvider';
import GeneralDataProvider from './context/GeneralDataContext/GeneralDataProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GeneralDataProvider>
    <CategoriesProvider>
      <ProjectsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProjectsProvider>
    </CategoriesProvider>
  </GeneralDataProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
