import React from 'react';

import './bottomBar.scss';

import { ShareSVG, InfoSVG, LoveSVG } from '../svg';

const BottomBar = () => {
  return (
    <>
      <div className='sqrs mica dsh'>
        <div className='sqr share'>
          <ShareSVG />
        </div>
        <div className='sqr love'>
          <LoveSVG />
        </div>
        <div className='sqr list'>
          <InfoSVG />
        </div>
      </div>
      <div className='bottom-bar mica dsh' />
    </>
  );
};

export default BottomBar;
