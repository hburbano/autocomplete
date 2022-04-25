function debounce<T extends unknown[], U>(
  callback: (...args: T) => PromiseLike<U> | U,
  wait: number
) {
  let timer: number;

  return (...args: T): Promise<U> => {
    clearTimeout(timer);
    return new Promise((resolve) => {
      timer = setTimeout(() => resolve(callback(...args)), wait);
    });
  };
}

const options: RequestInit = {
  method: 'GET',
};

function api<T>(endpoint: string, params: { [key: string]: string }): Promise<T> {
  const urlSP = new URLSearchParams({
    api_key: import.meta.env.VITE_MOVIEDB_API_KEY,
    ...params,
  });
  const API_URL = 'https://api.themoviedb.org/3';
  const url = `${API_URL}${endpoint}?${urlSP.toString()}`;
  return fetch(url, options).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json() as Promise<T>;
  });
}

function fetchMoviesByKeyword(keyword: string) {
  return api<MovieDBResponse<Movie>>('/search/movie', { query: keyword })
    .then((response) => {
      return response.results || [];
    })
    .catch((error) => {
      console.error(error);
      return [];
    });
}

export { debounce, fetchMoviesByKeyword };
