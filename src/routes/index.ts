import { Router, IRouter } from 'express';
import {
  latestMovies,
  popularMovies,
  recentReleaseMovies,
} from '../controllers/movie.controller';

const router: IRouter = Router();

router.get('/movies', latestMovies);
router.get('/popular/movies', popularMovies);
router.get('/recent-release/movies', recentReleaseMovies);

export default router;
