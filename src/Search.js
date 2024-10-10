import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // Replace spaces with '+' for the API request
    const formattedQuery = query.trim().replace(/\s+/g, '+');
    onSearch(formattedQuery); // Call the onSearch function passed as a prop
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for songs..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSearch()} // Trigger search on Enter key
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default Search;
