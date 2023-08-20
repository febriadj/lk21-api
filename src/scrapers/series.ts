import cheerio from 'cheerio';
import { AxiosResponse } from 'axios';
import { Request } from 'express';
import { ISeasonsList, ISeries, ISeriesDetails } from '../types';

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
      obj['title'] =
        $(parent).find('figure > a > picture > img').attr('alt') ?? '';
      obj['type'] = 'series';
      obj['posterImg'] = `https:${$(parent)
        .find('figure > a > picture > img')
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

/**
 * Scrape series details asynchronously
 * @param {Request} ExpressRequest
 * @param {AxiosResponse} AxiosResponse
 * @returns {Promise.<ISeriesDetails>} series details object
 */
export const scrapeSeriesDetails = async (
  req: Request,
  res: AxiosResponse
): Promise<ISeriesDetails> => {
  const { originalUrl } = req;

  const $: cheerio.Root = cheerio.load(res.data);
  const obj = {} as ISeriesDetails;

  const genres: string[] = [];
  const directors: string[] = [];
  const countries: string[] = [];
  const casts: string[] = [];

  $('div.content').find('blockquote').find('strong').remove();

  obj['_id'] = originalUrl.split('/').reverse()[0];
  obj['title'] =
    $('div.content-poster').find('figure > picture > img').attr('alt') ?? '';
  obj['type'] = 'series';
  obj['posterImg'] = `https:${$('div.content-poster')
    .find('figure > picture > img')
    .attr('src')}`;

  $('div.content > div').each((i, el) => {
    /* eslint-disable */
    switch ($(el).find('h2').text().toLowerCase()) {
      case 'durasi':
        obj['duration'] = $(el).find('h3').text().trim();
        break;
      case 'imdb':
        obj['rating'] = $(el).find('h3:nth-child(2)').text().trim();
        break;
      case 'diterbitkan':
        obj['releaseDate'] = $(el).find('h3').text().trim();
        break;
      case 'status':
        obj['status'] = $(el).find('h3 > span').text().toLowerCase().trim();
        break;
      case 'sutradara':
        $(el)
          .find('h3 > a')
          .each((i, el) => {
            directors.push($(el).text().trim());
          });
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
  obj['trailerUrl'] = `${$('div.player-content > iframe').attr('src')}`;
  obj['genres'] = genres;
  obj['directors'] = directors;
  obj['countries'] = countries;
  obj['casts'] = casts;

  const epsElem: cheerio.Cheerio = $('div.serial-wrapper > div.episode-list');
  const seasons: ISeasonsList[] = [];

  for (let i = epsElem.length; i >= 1; i--) {
    const obj2 = {} as ISeasonsList;

    obj2['season'] = i;
    obj2['totalEpisodes'] = $(epsElem[epsElem.length - i]).find(
      'a.btn-primary'
    ).length;

    seasons.push(obj2);
  }

  obj['seasons'] = seasons;

  return obj;
};
