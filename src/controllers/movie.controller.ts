import { NextFunction as Next, Request, Response } from 'express';
import axios from 'axios';
import { scrapeMovieDetails, scrapeMovies } from '../scrapers/movie.scraper';

type TController = (req: Request, res: Response, next?: Next) => Promise<void>;

/**
 * Controller for `/movies` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const latestMovies: TController = async (req, res) => {
  try {
    const { page } = req.query;

    const axiosRequest = await axios.get(
      `${process.env.LK21_URL}/latest${Number(page) > 1 ? `/page/${page}` : ''}`
    );

    const payload = await scrapeMovies(req, axiosRequest);

    res.status(200).json(payload);
  } catch (err) {
    console.error(err);

    res.status(400).json(null);
  }
};

/**
 * Controller for `/popular/movies` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const popularMovies: TController = async (req, res) => {
  try {
    const { page } = req.query;

    const axiosRequest = await axios.get(
      `${process.env.LK21_URL}/populer${
        Number(page) > 1 ? `/page/${page}` : ''
      }`
    );

    // scrape popular movies
    const payload = await scrapeMovies(req, axiosRequest);

    res.status(200).json(payload);
  } catch (err) {
    console.error(err);

    res.status(400).json(null);
  }
};

/**
 * Controller for `/recent-release/movies` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const recentReleaseMovies: TController = async (req, res) => {
  try {
    const { page } = req.query;

    const axiosRequest = await axios.get(
      `${process.env.LK21_URL}/release${
        Number(page) > 1 ? `/page/${page}` : ''
      }`
    );

    const payload = await scrapeMovies(req, axiosRequest);

    res.status(200).json(payload);
  } catch (err) {
    console.error(err);

    res.status(400).json(null);
  }
};

/**
 * Controller for `/top-rated/movies` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const topRatedMovies: TController = async (req, res) => {
  try {
    const { page } = req.query;

    const axiosRequest = await axios.get(
      `${process.env.LK21_URL}/rating${Number(page) > 1 ? `/page/${page}` : ''}`
    );

    const payload = await scrapeMovies(req, axiosRequest);

    res.status(200).json(payload);
  } catch (err) {
    console.error(err);

    res.status(400).json(null);
  }
};

/**
 * Controller for `/movies/{movieId}` route
 * @param {Request} req
 * @param {Response} res
 * @param {Next} next
 */
export const movieDetails: TController = async (req, res) => {
  try {
    const { id } = req.params;

    const axiosRequest = await axios.get(`${process.env.LK21_URL}/${id}`);

    const payload = await scrapeMovieDetails(req, axiosRequest);

    res.status(200).json(payload);
  } catch (err) {
    console.error(err);

    res.status(400).json(null);
  }
};
