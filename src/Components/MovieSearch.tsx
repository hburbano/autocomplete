import React, { useState, useMemo, useCallback } from 'react';
import { debounce, fetchMoviesByKeyword } from '../utils';
import { Highlight } from './Highlight';

const MovieSearch = () => {
  //For a more generic componet we
  const [movies, setMovies] = useState<Movie[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  const text = {
    label: 'Search for a movie',
    placeholder: 'Search for a movie',
  };

  const debouncedFetchMovies = useMemo(
    () =>
      debounce(async (keyword: string) => {
        const movies = await fetchMoviesByKeyword(keyword);
        setMovies(movies);
      }, 300),
    []
  );

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setKeyword(value);
      debouncedFetchMovies(value);
    },
    [debouncedFetchMovies]
  );

  return (
    <div className="MovieSearch-Container">
      <label className="screen-reader" htmlFor="keyword">
        {text.label}
      </label>
      <input
        className="MovieSearch-Input"
        type="text"
        id="keyword"
        name="keyword"
        placeholder={text.placeholder}
        onChange={handleOnChange}
        value={keyword}
      ></input>
      <ul className="MovieSearch-List">
        {movies?.map((movie, idx) => (
          <li
            className="MovieSearch-List-Item"
            onClick={(_) => {
              setMovies([]);
              setKeyword(movie.title);
            }}
            key={movie.id || idx}
          >
            {<Highlight text={movie.title} highlight={keyword} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export { MovieSearch };
