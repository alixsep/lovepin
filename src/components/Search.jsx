import React, { useState } from 'react';

import './search.scss';

import { SearchSVG } from '../svg';

const Search = () => {
  const [query, setQuery] = useState('');

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className='search-group mica dsh'>
      <input
        className='search-input'
        type='text'
        value={query}
        onChange={handleChange}
      />
      <div className="search">
          <SearchSVG />
      </div>
    </div>
  );
};

export default Search;
