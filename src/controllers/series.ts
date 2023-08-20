import axios from 'axios';
import { NextFunction as Next, Request, Response } from 'express';
import { scrapeSeries, scrapeSeriesDetails } from '../scrapers/series';

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
      `${process.env.ND_URL}/latest-series${
        Number(page) > 1 ? `/page/${page}` : ''
      }`
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

/**
 * Controller for `/recent-release/series` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const recentReleaseSeries: TController = async (req, res) => {
  try {
    const { page = 0 } = req.query;

    const axiosRequest = await axios.get(
      `${process.env.ND_URL}/release${Number(page) > 1 ? `/page/${page}` : ''}`
    );

    const payload = await scrapeSeries(req, axiosRequest);

    res.status(200).json(payload);
  } catch (err) {
    console.error(err);

    res.status(400).json(null);
  }
};

/**
 * Controller for `/top-rated/series` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const topRatedSeries: TController = async (req, res) => {
  try {
    const { page = 0 } = req.query;

    const axiosRequest = await axios.get(
      `${process.env.ND_URL}/rating${Number(page) > 1 ? `/page/${page}` : ''}`
    );

    const payload = await scrapeSeries(req, axiosRequest);

    res.status(200).json(payload);
  } catch (err) {
    console.error(err);

    res.status(400).json(null);
  }
};

/**
 * Controller for `/series/:seriesId` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const seriesDetails: TController = async (req, res) => {
  try {
    const { id } = req.params;

    const axiosRequest = await axios.get(`${process.env.ND_URL}/${id}`);

    const payload = await scrapeSeriesDetails(req, axiosRequest);

    res.status(200).json(payload);
  } catch (err) {
    console.error(err);

    res.status(400).json(null);
  }
};
