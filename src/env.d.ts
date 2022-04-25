interface ImportMetaEnv {
  readonly VITE_MOVIEDB_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface MovieDBResponse<T> {
  readonly page: number;
  readonly results: T[];
}

interface Movie {
  id: number;
  title: string;
}
