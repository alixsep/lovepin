import React from 'react';

import './share.scss';

import qr from '../img/qr.png';

const Share = () => {
  return (
    <div className='share'>
      <p className='prg'>
        Share Lovepin with your friends! Help them learn English words easily!
      </p>
      <div className='qr'>
        <div className='png'>
          <img src={qr} alt='QR Code' />
        </div>
        <div className='scan-text'>SCAN ME~!</div>
      </div>
      <p className='prg'>Scan the QR code above or share this link:</p>
      <p className='prg'>
        <strong>https://alixsep.github.io/lovepin/</strong>
      </p>
    </div>
  );
};

export default Share;
