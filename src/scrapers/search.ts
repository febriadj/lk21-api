import cheerio from 'cheerio';
import { AxiosResponse } from 'axios';
import { Request } from 'express';
import { ISearchedMoviesOrSeries } from '../types';

/**
 * Scrape searched movies or series
 * @param {Request} req
 * @param {AxiosResponse} res
 * @returns {Promise.<ISearchedMoviesOrSeries[]>} array of movies or series
 */
export const scrapeSearchedMoviesOrSeries = async (
    req: Request,
    res: AxiosResponse
): Promise<ISearchedMoviesOrSeries[]> => {
    const $: cheerio.Root = cheerio.load(res.data);
    const payload: ISearchedMoviesOrSeries[] = [];
    const {
        headers: { host },
        protocol,
    } = req;

    $('div.search-wrapper > div.search-item').each((i, el) => {
        const content: cheerio.Cheerio = $(el).find('div.search-content');
        const obj = {} as ISearchedMoviesOrSeries;
        const genres: string[] = [];

        let type: 'movie' | 'series' = 'movie';

        $(el)
            .find('p.cat-links > a')
            .each((i, el2) => {
                const x: string[] = $(el2).attr('href')?.split('/') || [];

                if (x[1] === 'genre') genres.push(x[2]);
                if (x[1] === 'series') type = 'series';
            });

        const movieId =
            $(content).find('h2 > a').attr('href')?.split('/').reverse()[1] ||
            '';

        obj['_id'] = movieId;
        obj['title'] = $(content).find('h2 > a').text();
        obj['type'] = type;
        obj['posterImg'] = `https://${$(el)
            .find('figure > a > img')
            .attr('src')}`;
        obj['url'] = `${protocol}://${host}/${type}/${movieId}`;
        obj['genres'] = genres;

        /* eslint-disable */
        $(content)
            .find('p')
            .each((i, el2) => {
                switch ($(el2).find('strong').text().toLowerCase()) {
                    case 'sutradara:':
                        $(el2).find('strong').remove();
                        obj['directors'] = $(el2).text().trim().split(', ');
                        break;
                    case 'bintang:':
                        $(el2).find('strong').remove();
                        obj['casts'] = $(el2).text().trim().split(', ');
                        break;
                    default:
                        break;
                }
            });
        /* eslint-enable */

        payload.push(obj);
    });

    return payload;
};
