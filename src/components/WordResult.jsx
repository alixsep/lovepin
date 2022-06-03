import React, { useRef } from 'react';

import './worldResult.scss';

import { LoveSVG } from '../svg';
import { getWord, updateWord } from '../utils/database';

const WordResult = ({ word, setWord, show, isFocused, setIsFocused }) => {
  const ref = useRef(null);

  const likeWord = (e) => {
    let newWord = word;
    let love = !word.love;
    newWord.love = love;
    setWord((prev) => ({ ...prev, love: love }));
    updateWord(newWord);
  };

  const likeWordDef = (definition, i) => {
    let newWord = word;
    let love = !definition.love;
    let newDefinitions = word.definitions;
    newDefinitions[i].love = love;
    newWord.definitions = newDefinitions;
    setWord((prev) => ({ ...prev, definitions: newDefinitions }));
    updateWord(newWord);
  };

  return (
    <div
      ref={ref}
      className={`word-result mica dsh${show ? ' open' : ''}${
        word.id ? ' opaque' : ''
      }`}
      style={{ pointerEvents: word.id || !isFocused ? 'all' : 'none' }}
      onClick={() => {
        setIsFocused(false);
      }}
    >
      <h1 className='word' onDoubleClick={likeWord}>
        <span className='text'>
          {word.word}
          <div className='heart' onClick={likeWord}>
            <LoveSVG on={word.love} />
          </div>
        </span>
      </h1>
      <p className='pos'>{word.pos}</p>
      <div className='pronunciation'>
        <div className='us'>{word.pronunciation?.us?.phonetics}</div>
        <div className='space' />
        <div className='uk'>{word.pronunciation?.uk?.phonetics}</div>
      </div>
      <div className='level'>Level: {word.level}</div>
      {word.extras &&
        word.extras.map((el, i) => (
          <div key={i} className='extra'>
            {el}
          </div>
        ))}
      <h2 className='sub-topic definitions'>Definitions: </h2>
      {word.definitions?.length &&
        word.definitions.map((definition, i) => (
          <div
            key={i}
            className='definition'
            onDoubleClick={(e) => {
              likeWordDef(definition, i);
            }}
          >
            <span>
              <div
                className='heart'
                onClick={(e) => {
                  likeWordDef(definition, i);
                }}
              >
                <LoveSVG on={definition.love} />
              </div>
              {i + 1}
              {'. '}
            </span>
            {definition.labels?.length &&
              definition.labels.map((label, i) => (
                <span key={i} className='label'>
                  {label}{' '}
                </span>
              ))}
            <span className='text'>
              {definition.definition[0].toUpperCase()}
              {definition.definition.slice(1)}
            </span>
            {!!definition.examples?.length && (
              <>
                <div className='sub-topic examples'>examples:</div>
                {definition.examples.map((example, i) => (
                  <p key={i} className='example'>
                    {'✦ '}
                    {example}
                  </p>
                ))}
              </>
            )}
          </div>
        ))}
      {word.otherResults?.length ? (
        <>
          <span className='sub-topic'>Also see: </span>
          {word.otherResults?.map((res, i) => (
            <span
              key={i}
              className='other-result'
              onClick={() => {
                getWord(res.id).then((word) => {
                  setWord(word);
                  ref.current.scrollTo(0, 0);
                });
              }}
            >
              {i ? ' | ' : ''}
              <span className='word'>{res.text}</span>{' '}
              <span className='pos'>{res.pos}</span>{' '}
            </span>
          ))}
        </>
      ) : null}
    </div>
  );
};

export default WordResult;
