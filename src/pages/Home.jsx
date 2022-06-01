import React, { useState, useEffect } from 'react';

import './home.scss';

import GetDB from '../components/GetDB';
import Search from '../components/Search';
import { verifyDB } from '../utils/database';
import BottomBar from '../components/BottomBar';

const Home = () => {
  const [vdb, setVdb] = useState(false);

  useEffect(() => {
    const _ = async () => {
      let v = await verifyDB();
      setVdb(v);
    };
    _();
  }, []);

  return (
    <div className='home-page'>
      <h1 className='title'>L o v e p i n</h1>
      {vdb ? (
        <>
          <Search />
          <BottomBar />
        </>
      ) : (
        <GetDB />
      )}
    </div>
  );
};

export default Home;
