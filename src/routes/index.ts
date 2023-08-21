import { Router, IRouter } from 'express';
import { streamSeries, streamMovie } from '@/controllers/stream';
import { moviesByGenre, setOfGenres } from '@/controllers/genre';
import { moviesByYear, setOfYears } from '@/controllers/year';
import { searchedMoviesOrSeries } from '@/controllers/search';
import { moviesByCountry, setOfCountries } from '@/controllers/country';

import {
    latestMovies,
    movieDetails,
    popularMovies,
    recentReleaseMovies,
    topRatedMovies,
} from '../controllers/movie';

import {
    latestSeries,
    popularSeries,
    recentReleaseSeries,
    seriesDetails,
    topRatedSeries,
} from '../controllers/series';

const router: IRouter = Router();

router.get('/movies', latestMovies);
router.get('/popular/movies', popularMovies);
router.get('/recent-release/movies', recentReleaseMovies);
router.get('/top-rated/movies', topRatedMovies);
router.get('/movies/:id', movieDetails);

router.get('/movies/:id/streams', streamMovie);

router.get('/genres', setOfGenres);
router.get('/genres/:genre', moviesByGenre);

router.get('/countries', setOfCountries);
router.get('/countries/:country', moviesByCountry);

router.get('/years', setOfYears);
router.get('/years/:year', moviesByYear);

router.get('/series', latestSeries);
router.get('/popular/series', popularSeries);
router.get('/recent-release/series', recentReleaseSeries);
router.get('/top-rated/series', topRatedSeries);
router.get('/series/:id', seriesDetails);

router.get('/series/:id/streams', streamSeries);

router.get('/search/:title', searchedMoviesOrSeries);

export default router;
