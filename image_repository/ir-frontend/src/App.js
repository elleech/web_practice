import axios from 'axios';
import React from 'react';
import Router from './Router';
import { AuthContextProvider } from './context/AuthContext';

// setup for browser to store token
axios.defaults.withCredentials = true;

function App() {
  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  );
}

export default App;
