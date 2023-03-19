import axios from 'axios';
import { NextFunction as Next, Request, Response } from 'express';
import { scrapeSetOfYears } from '../scrapers/year.scraper';

type TController = (req: Request, res: Response, next?: Next) => Promise<void>;

/**
 * Controller for `/years` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const setOfYears: TController = async (req, res) => {
  try {
    const axiosRequest = await axios.get(
      `${process.env.LK21_URL}/rekomendasi-film-pintar`
    );

    const payload = await scrapeSetOfYears(req, axiosRequest);

    res.status(200).json(payload);
  } catch (err) {
    console.error(err);

    res.status(400).json(null);
  }
};
