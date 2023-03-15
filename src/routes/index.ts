import { Router, IRouter } from 'express';
import { latestMovies } from '../controllers/movie.controller';

const router: IRouter = Router();

router.get('/movies', latestMovies);

export default router;
