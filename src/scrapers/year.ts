import cheerio from 'cheerio';
import { AxiosResponse } from 'axios';
import { Request } from 'express';
import { ISetOfYears } from '@/types';

/**
 * Scrape a set of release years asynchronously
 * @param {Request} ExpressRequest
 * @param {AxiosResponse} AxiosResponse
 * @returns {Promise.<ISetOfYears[]>} a set of release years
 */
export const scrapeSetOfYears = async (
    req: Request,
    res: AxiosResponse
): Promise<ISetOfYears[]> => {
    const $: cheerio.Root = cheerio.load(res.data);
    const payload: ISetOfYears[] = [];
    const {
        protocol,
        headers: { host },
    } = req;

    $('select#year > option').each((i, el) => {
        const target: string[] = $(el).text().split(' ');
        const obj = {} as ISetOfYears;

        obj['parameter'] = target[0];
        obj['numberOfContents'] = Number(
            target[1].substring(1, target[1].length - 1)
        );
        obj['url'] = `${protocol}://${host}/years/${target[0]}`;

        payload.push(obj);
    });

    // the first element doesn't contain the year
    payload.shift();

    return payload;
};
