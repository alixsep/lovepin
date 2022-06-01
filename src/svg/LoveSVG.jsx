import React from 'react';

export const LoveSVG = ({ on }) => {
  return (
    <svg
      className='svg_icon love'
      viewBox='0 10 158.75 120.75'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        style={{
          fill: on ? '#d40055' : '#ffffff20',
          fillOpacity: 1,
          stroke: 'none',
          strokeWidth: 0,
          strokeDasharray: 'none',
        }}
        d='M7.306 40.483h-48v96h96v-48h-48v-48z'
        transform='rotate(-45 11.86 -11.551)'
      />
    </svg>
  );
};
