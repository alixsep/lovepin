import React from 'react';

import './worldResult.scss';

import { LoveSVG } from '../svg';
import { updateWord } from '../utils/database';

const WordResult = ({ word, setWord, show }) => {
  return (
    <div className={`word-result mica dsh${show ? ' open' : ''}`}>
      <h1
        className='word'
        onDoubleClick={() => {
          let newWord = word;
          let love = !word.love;
          newWord.love = love;
          setWord((prev) => ({ ...prev, love: love }));
          updateWord(newWord);
        }}
      >
        <span className='text'>
          {word?.word}
          <div className='heart'>
            <LoveSVG on={word?.love} />
          </div>
        </span>
      </h1>
      <p className='pos'>{word?.pos}</p>
      <div className='pronunciation'>
        <div className='us'>{word?.pronunciation?.us?.phonetics}</div>
        <div className='space' />
        <div className='uk'>{word?.pronunciation?.uk?.phonetics}</div>
      </div>
      <div className='level'>Level: {word?.level}</div>
      {word.extras &&
        word.extras.map((el, i) => (
          <div key={i} className='extra'>
            {el}
          </div>
        ))}
      <h2 className='sub-topic definitions'>Definitions: </h2>
      {word.definitions &&
        word.definitions.map((definition, i) => (
          <div
            key={i}
            className='definition'
            onDoubleClick={() => {
              let newWord = word;
              let love = !definition.love;
              let newDefinitions = word.definitions;
              newDefinitions[i].love = love;
              newWord.definitions = newDefinitions;
              setWord((prev) => ({ ...prev, definitions: newDefinitions }));
              updateWord(newWord);
            }}
          >
            <span>
              <div className='heart'>
                <LoveSVG on={definition.love} />
              </div>
              {i + 1}
              {'. '}
            </span>
            {definition.labels &&
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
    </div>
  );
};

export default WordResult;
