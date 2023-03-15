import { Router, IRouter } from 'express';
import { latestMovies, popularMovies } from '../controllers/movie.controller';

const router: IRouter = Router();

router.get('/movies', latestMovies);
router.get('/popular/movies', popularMovies);

export default router;
