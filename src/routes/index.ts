import { Router, IRouter } from 'express';
import {
  latestMovies,
  popularMovies,
  recentReleaseMovies,
  topRatedMovies,
} from '../controllers/movie.controller';

const router: IRouter = Router();

router.get('/movies', latestMovies);
router.get('/popular/movies', popularMovies);
router.get('/recent-release/movies', recentReleaseMovies);
router.get('/top-rated/movies', topRatedMovies);

export default router;
