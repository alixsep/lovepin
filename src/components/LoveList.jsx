import React, { useState, useEffect } from 'react';

import './loveList.scss';

import { getLikedWords, getWord } from '../utils/database';

const LovedList = ({ query, setQuery, word, setWord, handleClose }) => {
  const [lovedWords, setLovedWords] = useState([]);

  useEffect(() => {
    const _ = async () => {
      let likedWords = await getLikedWords();
      setLovedWords(likedWords);
    };
    _();
  }, []);

  return (
    <div className='love-list'>
      {lovedWords.length
        ? lovedWords.map((w, i) => (
            <div
              className='words'
              key={w.id}
              onClick={() => {
                setQuery(w.word);
                getWord(w.id).then((word) => setWord(word));
                handleClose();
              }}
            >
              <span className='word'>{w.word}</span>{' '}
              <span className='pos'>{w.pos}</span>
            </div>
          ))
        : <div className='tip'>Nothing here!</div>}
    </div>
  );
};

export default LovedList;
