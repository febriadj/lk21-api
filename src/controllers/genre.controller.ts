import axios from 'axios';
import { NextFunction as Next, Request, Response } from 'express';
import { scrapeSetOfGenres } from '../scrapers/genre.scraper';

type TController = (req: Request, res: Response, next?: Next) => Promise<void>;

/**
 * Controller for `/genres` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const setOfGenres: TController = async (req, res) => {
  try {
    const axiosRequest = await axios.get(`${process.env.LK21_URL}`);

    const payload = await scrapeSetOfGenres(req, axiosRequest);

    res.status(200).json(payload);
  } catch (err) {
    console.error(err);

    res.status(400).json(null);
  }
};
