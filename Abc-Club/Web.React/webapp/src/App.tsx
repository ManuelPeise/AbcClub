import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './lib/Router';

const App: React.FC = () =>{
  return(
    <BrowserRouter>
      <AppRouter/>
    </BrowserRouter>
  )
}

export default App;
