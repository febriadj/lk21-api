import { AxiosResponse } from 'axios';

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

export type TScraper<Type> = (
  axiosResponse: AxiosResponse,
  options: {
    protocol: string;
    host: string | undefined;
  }
) => Promise<Type>;
