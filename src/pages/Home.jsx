import React from 'react';
import GetDB from '../components/GetDB';
import Search from '../components/Search';

import './home.scss';

const Home = () => {
  return (
    <div className='home-page'>
      <h1 className='title'>L o v e p i n</h1>
      <Search />
      <GetDB />
    </div>
  );
};

export default Home;
