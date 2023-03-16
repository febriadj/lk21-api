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
