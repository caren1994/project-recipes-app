import React from 'react';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Router from './routes/Router';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <div>
        <h1>Receitas</h1>
        <Router />
      </div>
    </AppProvider>
  );
}

export default App;
