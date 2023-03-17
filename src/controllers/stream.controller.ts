import axios from 'axios';
import { NextFunction as Next, Request, Response } from 'express';
import { scrapeStreamSources } from '../scrapers/stream.scraper';

type TController = (req: Request, res: Response, next?: Next) => Promise<void>;

export const streamSources: TController = async (req, res) => {
  try {
    const { originalUrl } = req;

    const movieId = originalUrl.split('/').reverse()[1];

    const axiosRequest = await axios.get(`${process.env.LK21_URL}/${movieId}`);

    const payload = await scrapeStreamSources(req, axiosRequest);

    res.status(200).json(payload);
  } catch (err) {
    console.error(err);

    res.status(400).json(null);
  }
};
