type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface IMovies {
  _id: string;
  title: string;
  posterImg: string;
  url: string;
  genres: string[];
  type: 'movie' | 'series';
  qualityResolution: string;
  rating: string;
}

export interface IMovieDetails
  extends Omit<IMovies, 'url' | 'qualityResolution'> {
  synopsis: string;
  duration: string;
  director: string;
  casts: string[];
  quality: string;
  releaseDate: string;
  countries: string[];
  trailerUrl: string;
}

export interface IStreamSources {
  provider: string;
  url: string;
  resolutions: string[];
}
