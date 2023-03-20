import axios from 'axios';
import { NextFunction as Next, Request, Response } from 'express';
import { scrapeSeries } from '../scrapers/series.scraper';

type TController = (req: Request, res: Response, next?: Next) => Promise<void>;

/**
 * Controller for `/series` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const latestSeries: TController = async (req, res) => {
  try {
    const { page = 0 } = req.query;

    const axiosRequest = await axios.get(
      `${process.env.ND_URL}/latest${Number(page) > 1 ? `/page/${page}` : ''}`
    );

    const payload = await scrapeSeries(req, axiosRequest);

    res.status(200).json(payload);
  } catch (err) {
    console.error(err);

    res.status(400).json(null);
  }
};

/**
 * Controller for `/popular/series` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const popularSeries: TController = async (req, res) => {
  try {
    const { page = 0 } = req.query;

    const axiosRequest = await axios.get(
      `${process.env.ND_URL}/populer${Number(page) > 1 ? `/page/${page}` : ''}`
    );

    const payload = await scrapeSeries(req, axiosRequest);

    res.status(200).json(payload);
  } catch (err) {
    console.error(err);

    res.status(400).json(null);
  }
};
