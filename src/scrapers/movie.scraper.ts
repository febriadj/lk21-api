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

  const genres: string[] = [];
  const countries: string[] = [];
  const casts: string[] = [];

  $('div.content').find('blockquote').find('strong').remove();

  obj['_id'] = originalUrl.split('/').reverse()[0];
  obj['title'] = $('div.content-poster').find('figure > img').attr('alt') ?? '';
  obj['type'] = 'movie';
  obj['posterImg'] = `https:${$('div.content-poster')
    .find('figure > img')
    .attr('src')}`;

  $('div.content > div').each((i, el) => {
    /* eslint-disable */
    switch ($(el).find('h2').text().toLowerCase()) {
      case 'sutradara':
        obj['director'] = $(el).find('h3 > a').text().trim();
        break;
      case 'durasi':
        obj['duration'] = $(el).find('h3').text().trim();
        break;
      case 'imdb':
        obj['rating'] = $(el).find('h3:nth-child(2)').text().trim();
        break;
      case 'diterbitkan':
        obj['releaseDate'] = $(el).find('h3').text().trim();
        break;
      case 'kualitas':
        obj['quality'] = $(el).find('h3 > a').text().trim();
        break;
      case 'negara':
        $(el)
          .find('h3 > a')
          .each((i, el) => {
            countries.push($(el).text());
          });
        break;
      case 'genre':
        $(el)
          .find('h3 > a')
          .each((i, el) => {
            genres.push($(el).text());
          });
        break;
      case 'bintang film':
        $(el)
          .find('h3')
          .each((i, el) => {
            casts.push($(el).find('a').text());
          });
        break;
      default:
        break;
    }
    /* eslint-enable */
  });

  obj['synopsis'] = $('div.content').find('blockquote').text();
  obj['trailerUrl'] =
    $('div.action-player').find('a.fancybox').attr('href') ?? '';
  obj['genres'] = genres;
  obj['countries'] = countries;
  obj['casts'] = casts;

  return obj;
};
