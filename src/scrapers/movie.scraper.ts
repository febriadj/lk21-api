import { Request } from 'express';
import cheerio from 'cheerio';
import { AxiosResponse } from 'axios';
import { IMovies } from '../types';

/**
 * Scrape movies asynchronously
 * @param {Request} ExpressRequest
 * @param {AxiosResponse} AxiosResponse
 * @returns {Promise.<IMovies[]>} array of movies objects
 */
export const scrapeMovies = async (
  req: Request,
  res: AxiosResponse
): Promise<IMovies[]> => {
  const $: cheerio.Root = cheerio.load(res.data);
  const payload: IMovies[] = [];
  const {
    protocol,
    headers: { host },
  } = req;

  $('main > div.container > section.archive')
    .find('div.grid-archive > div#grid-wrapper > div.infscroll-item')
    .each((i, el) => {
      const parent: cheerio.Cheerio = $(el).find('article.mega-item');
      const genres: string[] = [];

      $(parent)
        .find('footer')
        .find('div.grid-categories > a')
        .each((i, el2) => {
          const x: string[] = $(el2).attr('href')?.split('/') ?? [];

          if (x.length > 0 && x[1] === 'genre') {
            genres.push(x[2]);
          }
        });

      const movieId: string =
        $(parent).find('figure > a').attr('href')?.split('/').reverse()[1] ??
        '';

      const obj = {} as IMovies;

      obj['_id'] = movieId;
      obj['title'] = $(parent).find('figure > a > img').attr('alt') ?? '';
      obj['posterImg'] = `https:${$(parent)
        .find('figure > a > img')
        .attr('src')}`;
      obj['url'] = `${protocol}://${host}/movies/${movieId}`;
      obj['genres'] = genres;
      obj['type'] = 'movie';
      obj['qualityResolution'] = $(parent)
        .find('figure')
        .find('div.quality')
        .text();
      obj['rating'] = $(parent).find('figure').find('div.rating').text();

      payload.push(obj);
    });

  return payload;
};
