import axios from 'axios';
import { NextFunction as Next, Request, Response } from 'express';
import { getCookie, scrapeDownloads } from '@/scrapers/download';

type TController = (req: Request, res: Response, next?: Next) => Promise<void>;

type IData = {
    slug: string;
};
/**
 * Controller for `/movie/:id/downloads` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const downloadMovie: TController = async (req, res) => {
    try {
        const { originalUrl } = req;

        const movieId = originalUrl.split('/').reverse()[1];

        const cookie = await getCookie(movieId);

        const axiosRequest = await axios.post(
            `https://dl.lk21static.xyz/verifying.php`,
            { slug: movieId },
            {
                headers: {
                    'content-type':
                        'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept-Encoding': 'application/json',
                    cookie: cookie,
                },
            }
        );
        const payload = await scrapeDownloads(req, axiosRequest);

        res.status(200).json(payload);
    } catch (err) {
        console.error(err);

        res.status(400).json(null);
    }
};

/**
 * Controller for `/series/:id/downloads` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */

export const downloadSeries: TController = async (req, res) => {
    try {
        const { originalUrl } = req;
        const { season = 1, episode = 1 } = req.query;

        const _ids = originalUrl.split('/').reverse()[1].split('-');
        const year = _ids.pop();

        const seriesId = _ids.join('-');

        const cookie = await getCookie(
            `${seriesId}-season-${season}-episode-${episode}-${year}`
        );
        const axiosRequest = await axios.post(
            `https://dl.lk21static.xyz/verifying.php`,
            { slug: `${seriesId}-season-${season}-episode-${episode}-${year}` },
            {
                headers: {
                    'content-type':
                        'application/x-www-form-urlencoded; charset=UTF-8',
                    'Accept-Encoding': 'application/json',
                    cookie: cookie,
                },
            }
        );

        const payload = await scrapeDownloads(req, axiosRequest);

        res.status(200).json(payload);
    } catch (err) {
        console.error(err);

        res.status(400).json(null);
    }
};
