import { AxiosResponse } from 'axios';
import cheerio from 'cheerio';
import { Request } from 'express';
import { ISetOfGenres } from '../types';

/**
 * Scrape a set of genres asynchronously
 * @param {Request} ExpressRequest
 * @param {AxiosResponse} AxiosResponse
 * @returns {Promise.<IMovies[]>} a set of genres
 */
export const scrapeSetOfGenres = async (
  req: Request,
  res: AxiosResponse
): Promise<ISetOfGenres[]> => {
  const genres: string[] = [
    'Action',
    'Adventure',
    'Animation',
    'Biography',
    'Comedy',
    'Crime',
    'Documentary',
    'Drama',
    'Family',
    'Fantasy',
    'History',
    'Horror',
    'Music',
    'Mystery',
    'Romance',
    'School',
    'Sci-fi',
    'Sport',
    'Thriller',
    'War',
  ];

  const $: cheerio.Root = cheerio.load(res.data);
  const payload: ISetOfGenres[] = [];

  $('form.form-filter')
    .find('div:nth-child(5) > select.form-control > option')
    .each((i, el) => {
      const target = $(el).text().split(' ');
      const obj = {} as ISetOfGenres;

      genres.map((genre) => {
        if (genre.toLowerCase() === target[0].toLowerCase()) {
          obj['name'] = target[0];
          obj['numberOfContents'] = Number(
            target[1].substring(1, target[1].length - 1)
          );

          payload.push(obj);
        }
      });
    });

  return payload;
};
