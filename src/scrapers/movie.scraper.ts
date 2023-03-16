import { Request } from 'express';
import cheerio from 'cheerio';
import { AxiosResponse } from 'axios';
import { IMovies, IMovieDetails } from '../types';

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
      obj['type'] = 'movie';
      obj['posterImg'] = `https:${$(parent)
        .find('figure > a > img')
        .attr('src')}`;
      obj['rating'] = $(parent).find('figure').find('div.rating').text();
      obj['url'] = `${protocol}://${host}/movies/${movieId}`;
      obj['qualityResolution'] = $(parent)
        .find('figure')
        .find('div.quality')
        .text();
      obj['genres'] = genres;

      payload.push(obj);
    });

  return payload;
};

/**
 * Scrape movie details asynchronously
 * @param {Request} ExpressRequest
 * @param {AxiosResponse} AxiosResponse
 * @returns {Promise.<IMovieDetails>} movie details object
 */
export const scrapeMovieDetails = async (
  req: Request,
  res: AxiosResponse
): Promise<IMovieDetails> => {
  const { originalUrl } = req;

  const $: cheerio.Root = cheerio.load(res.data);
  const obj = {} as IMovieDetails;

  const countries: string[] = [];
  const casts: string[] = [];

  $('div.content').find('blockquote').find('strong').remove();
  $('div.content')
    .find('div:nth-child(2) > h3 > a')
    .each((i, el) => {
      countries.push($(el).text());
    });

  $('div.content')
    .find('div:nth-child(3) > h3')
    .each((i, el) => {
      casts.push($(el).find('a').text());
    });

  obj['_id'] = originalUrl.split('/').reverse()[0];
  obj['title'] = $('div.content-poster').find('figure > img').attr('alt') ?? '';
  obj['type'] = 'movie';
  obj['posterImg'] = `https:${$('div.content-poster')
    .find('figure > img')
    .attr('src')}`;
  obj['rating'] = $('div.content')
    .find('div:nth-child(6) > h3:nth-child(2)')
    .text();
  obj['quality'] = $('div.content').find('div:nth-child(1) > h3 > a').text();
  obj['releaseDate'] = $('div.content').find('div:nth-child(7) > h3').text();
  obj['director'] = $('div.content').find('div:nth-child(4) > h3 > a').text();
  obj['synopsis'] = $('div.content').find('blockquote').text();
  obj['duration'] = $('div.content').find('div:nth-child(12) > h3').text();
  obj['trailerUrl'] =
    $('div.action-player').find('a.fancybox').attr('href') ?? '';
  obj['genres'] = ['action'];
  obj['countries'] = countries;
  obj['casts'] = casts;

  return obj;
};
