import React, { useState } from 'react';

import './bottomBar.scss';

import { ShareSVG, InfoSVG, LoveSVG } from '../svg';
import Modal from './Modal';
import About from './About';
import Share from './Share';
import LoveList from './LoveList';

const BottomBar = ({ query, setQuery, word, setWord }) => {
  const [title, setTitle] = useState('About');
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <div className='sqrs mica dsh'>
        <div
          className='sqr share'
          onClick={() => {
            setTitle('Share');
            setShow(true);
          }}
        >
          <ShareSVG />
        </div>
        <div
          className='sqr love'
          onClick={() => {
            setTitle('Love list');
            setShow(true);
          }}
        >
          <LoveSVG />
        </div>
        <div
          className='sqr about'
          onClick={() => {
            setTitle('About');
            setShow(true);
          }}
        >
          <InfoSVG />
        </div>
      </div>
      <div className='bottom-bar mica dsh' />
      <Modal show={show} title={title} handleClose={handleClose}>
        {title === 'Love list' ? (
          <LoveList
            query={query}
            setQuery={setQuery}
            word={word}
            setWord={setWord}
            handleClose={handleClose}
          />
        ) : (
          <div className='body'>
            {!show ? null : title === 'About' ? (
              <About />
            ) : title === 'Share' ? (
              <Share />
            ) : null}
          </div>
        )}
      </Modal>
    </>
  );
};

export default BottomBar;
