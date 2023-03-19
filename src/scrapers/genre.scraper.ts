import path from 'node:path';
import fs from 'node:fs';
import cheerio from 'cheerio';
import { AxiosResponse } from 'axios';
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
  const $: cheerio.Root = cheerio.load(res.data);
  const payload: ISetOfGenres[] = [];
  const {
    headers: { host },
    protocol,
  } = req;

  const json = path.join(__dirname, '../json/genres.json');
  const genres: string[] = JSON.parse(fs.readFileSync(json, 'utf8'));

  $('form.form-filter')
    .find('div:nth-child(5) > select.form-control > option')
    .each((i, el) => {
      const target = $(el).text().split(' ');
      const obj = {} as ISetOfGenres;

      genres.map((genre) => {
        if (genre === target[0].toLowerCase()) {
          obj['parameter'] = genre;
          obj['name'] = target[0];
          obj['numberOfContents'] = Number(
            target[1].substring(1, target[1].length - 1)
          );
          obj['url'] = `${protocol}://${host}/genres/${genre}`;

          payload.push(obj);
        }
      });
    });

  return payload;
};
