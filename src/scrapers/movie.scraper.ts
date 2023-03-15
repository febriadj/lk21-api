import cheerio from 'cheerio';
import { IMovies, TScraper } from '../types';

/**
 * Scrape movies asynchronously
 * @param AxiosResponse
 * @param options
 * @returns {Promise.<IMovies[]>}
 */
export const scrapeMovies: TScraper<IMovies[]> = async (
  res,
  { protocol, host }
) => {
  const $ = cheerio.load(res.data);
  const payload: IMovies[] = [];

  $('main > div.container > section.archive > div.row:nth-child(2)')
    .find('div')
    .find('div.grid-archive > div.row > div')
    .each((i, el) => {
      const genres: string[] = [];
      const parent = $(el).find('article.mega-item');

      $(parent)
        .find('footer')
        .find('div.grid-categories > a')
        .each((i, el2) => {
          const href: string[] =
            $(el2).attr('href')?.substring(1).split('/') ?? [];

          if (href.length > 0 && href[0] === 'genre') {
            genres.push(href[1]);
          }
        });

      const _id: string =
        $(parent).find('figure > a').attr('href')?.split('/').reverse()[1] ??
        '';

      payload.push({
        _id,
        title: $(parent).find('figure > a > img').attr('alt') ?? '',
        posterImg: `https:${$(parent).find('figure > a > img').attr('src')}`,
        url: `${protocol}://${host}/movies/${_id}`,
        genres,
        type: 'movie',
        qualityResolution: $(parent).find('figure').find('div.quality').text(),
        rating: $(parent).find('figure').find('div.rating').text(),
      });
    });

  return payload;
};
