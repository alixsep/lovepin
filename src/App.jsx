import React from 'react';

import './app.css';

import Home from './pages/Home';
import Bg from './components/Bg';

const App = () => {
  return (
    <div className='app'>
      <Home />
      <Bg />
    </div>
  );
};

export default App;
