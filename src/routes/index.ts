import { Router, IRouter } from 'express';
import { streamSources } from '../controllers/stream.controller';
import { setOfGenres } from '../controllers/genre.controller';
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

router.get('/movies/:id/streams', streamSources);

router.get('/genres', setOfGenres);

export default router;
