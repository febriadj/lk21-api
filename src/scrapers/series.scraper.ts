import cheerio from 'cheerio';
import { AxiosResponse } from 'axios';
import { Request } from 'express';
import { ISeries } from '../types';

/**
 * Scrape series asynchronously
 * @param {Request} ExpressRequest
 * @param {AxiosResponse} AxiosResponse
 * @returns {Promise.<ISeries>} array of series objects
 */
export const scrapeSeries = async (
  req: Request,
  res: AxiosResponse
): Promise<ISeries[]> => {
  const $: cheerio.Root = cheerio.load(res.data);
  const payload: ISeries[] = [];
  const {
    headers: { host },
    protocol,
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

      const seriesId: string =
        $(parent).find('figure > a').attr('href')?.split('/').reverse()[1] ??
        '';

      const obj = {} as ISeries;

      obj['_id'] = seriesId;
      obj['title'] = $(parent).find('figure > a > img').attr('alt') ?? '';
      obj['type'] = 'series';
      obj['posterImg'] = `https:${$(parent)
        .find('figure > a > img')
        .attr('src')}`;
      obj['episode'] = Number(
        $(parent)
          .find('figure > div.grid-meta > div.last-episode > span')
          .text()
      );
      obj['rating'] = $(parent).find('figure').find('div.rating').text();
      obj['url'] = `${protocol}://${host}/series/${seriesId}`;
      obj['genres'] = genres;

      payload.push(obj);
    });

  return payload;
};
