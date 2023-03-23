| Request                                             | Response                                                    | Pagination |
| :-------------------------------------------------- | :---------------------------------------------------------- | :--------: |
| `GET /movies`                                       | Recent upload movies                                        |     √      |
| `GET /movies/{movieId}`                             | The movie details                                           |     -      |
| `GET /movies/{movieId}/streams`                     | Movie streaming sources                                     |     -      |
| `GET /popular/movies`                               | Popular movies                                              |     √      |
| `GET /recent-release/movies`                        | Recent release movies                                       |     √      |
| `GET /top-rated/movies`                             | Top rated movies                                            |     √      |
|                                                     |                                                             |            |
| `GET /series`                                       | Recent upload series                                        |     √      |
| `GET /series/{seriesId}`                            | The series details                                          |     -      |
| `GET /series/{seriesId}/streams`                    | Series streaming sources (default: season 1 episode 1)      |     -      |
| `GET /series/{seriesId}/streams?season=2&episode=8` | Series streaming sources with specific seasons and episodes |     -      |
| `GET /popular/series`                               | Popular series                                              |     √      |
| `GET /recent-release/series`                        | Recent release series                                       |     √      |
| `GET /top-rated/series`                             | Top rated series                                            |     √      |
|                                                     |                                                             |            |
| `GET /search/{movieOrSeriesTitle}`                  | Searched movies or series                                   |     -      |
|                                                     |                                                             |            |
| `GET /genres`                                       | A set of genres                                             |     -      |
| `GET /genres/{genre}`                               | List of movies by genre                                     |     √      |
| `GET /genres/{genre}/series`                        | List of series by genre                                     |     √      |
|                                                     |                                                             |            |
| `GET /countries`                                    | A set of countries                                          |     -      |
| `GET /countries/{country}`                          | List of movies by country                                   |     √      |
| `GET /countries/{country}/series`                   | List of series by country                                   |     √      |
|                                                     |                                                             |            |
| `GET /years`                                        | A set of years                                              |     -      |
| `GET /years/{year}`                                 | List of movies by release year                              |     √      |
| `GET /years/{year}/series`                          | List of series by release year                              |     √      |
