import cheerio from 'cheerio';
import { AxiosResponse } from 'axios';
import { Request } from 'express';
import { ISetOfCountries } from '@/types';
import countries from '@/json/countries.json';

/**
 * Scrape a set of countries asynchronously
 * @param {Request} ExpressRequest
 * @param {AxiosResponse} AxiosResponse
 * @returns {Promise.<ISetOfCountries[]>} a set of countries
 */
export const scrapeSetOfCountries = async (
    req: Request,
    res: AxiosResponse
) => {
    const $: cheerio.Root = cheerio.load(res.data);
    const payload: ISetOfCountries[] = [];
    const {
        protocol,
        headers: { host },
    } = req;

    $('select#country > option').each((i, el) => {
        const target: string[] = $(el).text().split(' ').reverse();
        const parameters = [...target];
        parameters.shift();

        const obj = {} as ISetOfCountries;

        countries.map((country) => {
            if (country.parameter === parameters.join('-').toLowerCase()) {
                obj['parameter'] = country.parameter;
                obj['name'] = country.name;
                obj['numberOfContents'] = Number(
                    target[0].substring(1, target[0].length - 1)
                );
                obj[
                    'url'
                ] = `${protocol}://${host}/countries/${country.parameter}`;

                payload.push(obj);
            }
        });
    });

    return payload;
};
