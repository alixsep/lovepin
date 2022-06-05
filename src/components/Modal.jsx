import React from 'react';
import { DismissSVG } from '../svg';

import './modal.scss';

const Modal = ({ show, title, handleClose, children }) => {
  return (
    <div className={`modal mica dsh${show ? ' open opaque' : ''}`}>
      {title ? (
        <div className='title-bar'>
          <div className='text'>{title}</div>
          <div className='close' onClick={handleClose}>
            <DismissSVG />
          </div>
        </div>
      ) : null}
      {children ? children : null}
    </div>
  );
};

export default Modal;
