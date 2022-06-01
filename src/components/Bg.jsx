import React from 'react';

import './bg.scss';

import { LovepinSVG } from '../svg';

const Bg = () => {
  let stars = [];

  for (let i = 0; i < 15; i++) {
    stars.push([
      Math.floor(Math.random() * 50) + 35,
      Math.floor(Math.random() * 80) + 10,
      Math.floor(Math.random() * 5),
    ]);
  }

  return (
    <div className='bg'>
      <div className='icon-wrap'>
        <LovepinSVG />
      </div>
      {stars.map((s, i) => (
        <div
          key={i}
          className='star'
          style={{
            top: `${s[0]}%`,
            left: `${s[1]}%`,
            animationDelay: `${s[2]}s`,
          }}
        >
          {'✦'}
        </div>
      ))}
      <div className="calig"></div>
    </div>
  );
};

export default Bg;
