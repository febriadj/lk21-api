import { Router, IRouter } from 'express';
import {
  latestMovies,
  movieDetails,
  popularMovies,
  recentReleaseMovies,
  topRatedMovies,
} from '../controllers/movie.controller';

const router: IRouter = Router();

router.get('/movies', latestMovies);
router.get('/popular/movies', popularMovies);
router.get('/recent-release/movies', recentReleaseMovies);
router.get('/top-rated/movies', topRatedMovies);
router.get('/movies/:id', movieDetails);

export default router;
