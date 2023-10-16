import axios from 'axios';
import cheerio from 'cheerio';
import { Request } from 'express';
import { IDownloads } from '@/types';
import { AxiosResponse } from 'axios';

/**
 * Scrape downloads asynchronously
 * @param {Request} ExpressRequest
 * @param {AxiosResponse} AxiosResponse
 * @returns {Promise.<IDownloads[]>} array of Downloads objects
 */
export const scrapeDownloads = async (
    req: Request,
    res: AxiosResponse
): Promise<IDownloads[]> => {
    const $: cheerio.Root = cheerio.load(res.data);

    let downloads: IDownloads[] = [];

    $('tbody > tr').each(function (i, el) {
        let server = $(el).find('strong').text()!;
        let link = $(el).find('a').attr('href')!;
        //@ts-ignore
        let quality = $(el).find('a').attr('class').substring(9, 13);
        downloads.push({
            server,
            link,
            quality,
        });
    });

    return downloads;
};

/**
 * Scrape getCookie asynchronously
 * @param {id} string
 */
export const getCookie = async (id: string) => {
    try {
        const headers = {
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Accept-Encoding': 'application/json',
        };
        const response = await axios.get(`${process.env.DL_URL}/get/${id}`, {
            headers: headers,
        });
        const data = response.data;
        const search = "setCookie('validate'";
        const idx = data.indexOf(search);
        const hasil = data.substring(idx + 23, idx + 63);
        const result = 'validate=' + hasil;
        return result;
    } catch (error) {
        throw new Error('failed get cookie');
    }
};
