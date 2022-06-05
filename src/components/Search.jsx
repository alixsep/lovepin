import React, { useState, useEffect } from 'react';

import './search.scss';

import { DismissSVG, SearchSVG } from '../svg';
import { getSearchResources, getWord } from '../utils/database';
import WordResult from './WordResult';

export const SearchResults = ({
  isFocused,
  word,
  resources,
  query,
  results,
  setQuery,
  setIsFocused,
  setWord,
}) => {
  return (
    <div
      className={`search-results mica dsh${isFocused ? ' open' : ''}`}
      style={{ pointerEvents: word.id && !isFocused ? 'none' : 'all' }}
    >
      {!query ? (
        <div className='tip'>Type something :D</div>
      ) : results.length ? (
        results.map(
          (result, i) =>
            i < 50 && (
              <div
                className='search-result'
                key={result.id}
                onClick={() => {
                  setQuery(result.word);
                  getWord(result.id).then((word) => setWord(word));
                  setIsFocused(false);
                }}
              >
                <span className='word'>{result.word}</span>{' '}
                <span className='pos'>{result.pos}</span>
              </div>
            )
        )
      ) : (
        <div className='tip'>Nothing here!</div>
      )}
    </div>
  );
};

const Search = ({ query, setQuery, word, setWord }) => {
  const [resources, setResources] = useState([]);
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e) => {
    let q = e.target.value;
    setQuery(q);
    if (q !== word.word) {
      setWord({});
    }
    setResults(
      resources.filter(
        (resource) =>
          q === '' || resource.word.toLowerCase().startsWith(q.toLowerCase())
      )
    );
  };

  useEffect(() => {
    const _ = async () => {
      let resources = await getSearchResources();
      setResources(resources);
    };
    _();
  }, []);

  return (
    <>
      <div
        className='search-group mica dsh'
        onBlur={() => {
          if (query === '') {
            setIsFocused(false);
          }
        }}
      >
        <input
          className='search-input'
          type='text'
          value={query}
          onChange={handleChange}
          onFocus={(e) => {
            setIsFocused(true);
          }}
        />
        {query ? (
          <div
            className='search'
            onClick={() => {
              setIsFocused(false);
              setResults([]);
              setWord({});
              setQuery('');
            }}
          >
            <DismissSVG />
          </div>
        ) : (
          <div className='search'>
            <SearchSVG />
          </div>
        )}
      </div>
      {resources ? (
        <SearchResults
          word={word}
          setWord={setWord}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
          resources={resources}
          results={results}
          query={query}
          setQuery={setQuery}
        />
      ) : null}
      <WordResult
        word={word}
        setWord={setWord}
        show={word.id && !isFocused}
        isFocused={isFocused}
        setIsFocused={setIsFocused}
      />
    </>
  );
};

export default Search;
