import { Request } from 'express';
import cheerio from 'cheerio';
import { AxiosResponse } from 'axios';
import { IStreamSources } from '@/types';

/**
 * Scrape stream sources asynchronously
 * @param {Request} ExpressRequest
 * @param {AxiosResponse} AxiosResponse
 * @returns {Promise.<IStreamSources[]>} array of stream sources objects
 */
export const scrapeStreamSources = async (
    req: Request,
    res: AxiosResponse
): Promise<IStreamSources[]> => {
    const $: cheerio.Root = cheerio.load(res.data);
    const payload: IStreamSources[] = [];

    $('div#load-sources')
        .find('ul > li')
        .each((i, el) => {
            const obj = {} as IStreamSources;

            const resolutions: string[] = [];

            $(el)
                .find('div > span')
                .each((i, el2) => {
                    resolutions.push($(el2).text());
                });

            obj['provider'] = $(el).find('a').text();
            obj['url'] = $(el).find('a').attr('href') ?? '';
            obj['resolutions'] = resolutions;

            payload.push(obj);
        });

    return payload;
};
