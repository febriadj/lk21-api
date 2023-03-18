# LK21 API

Unofficial LK21 (LayarKaca21) and NontonDrama APIs for streaming movies, animations, and series with Indonesian subtitles. LK21 API is perfect for improving your coding skills or just having fun exploring films from around the world. Best of all, you can enjoy this API without any financial commitment!

## Table of Contents

- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Reference](#reference)
  - [List of Endpoints](#list-of-endpoints)
  - [Pagination](#pagination)
- [FAQs](#faqs)
- [Showcase](#showcase)
- [License](#license)
- [Disclamer](#disclamer)

## Getting Started

### Installation

**Step 1:** Clone this repository.

```bash
git clone https://github.com/febriadj/lk21-api.git
```

**Step 2:** Rename the `.env.example` file to `.env` and complete the required [environment variables](#environment-variables).

**Step 3:** Install dependencies.

```bash
npm install
```

**Step 4:** Enable Git hooks and compile the TypeScript code.

```bash
npm run prepare && npm run build
```

**Step 5:** Run the project.

```bash
npm start
```

### Environment Variables

The target URLs have the potential to change at any time because their servers are extremely vulnerable to being blocked. Therefore, I declared the target URLs in the Node environment variables.

```bash
# LK21 (LayarKaca21) URL
LK21_URL = https://tv.lk21official.live

# NontonDrama URL
ND_URL = https://drama2.nontondrama.lol
```

## Reference

### List of Endpoints

| Request                  | Response             | Pagination |
| :----------------------- | :------------------- | :--------: |
| `GET /movies`            | Recent upload movies |     √      |
| `GET /movies/{movieId}`  | The movie details    |     -      |
| `GET /popular/movies`    | Popular movies       |     √      |
|                          |                      |            |
| `GET /series`            | Recent upload series |     √      |
| `GET /series/{seriesId}` | The series details   |     -      |
| `GET /popular/series`    | Popular series       |     √      |
|                          |                      |            |
| `GET /genres`            | A set of genres      |     -      |
| `GET /countries`         | A set of countries   |     -      |
| `GET /years`             | A set of years       |     -      |

See more LK21 API [endpoints](/docs/endpoints.md).

### Pagination

Some endpoints support a way of paging the dataset, taking a `page` as query parameters:

```bash
GET /popular/movies?page=5
```

## FAQs

<details>
  <summary><strong>What is LK21?</strong></summary>

LK21 (LayarKaca21) is a large-scale Indonesian streaming service that offers you to watch movies, animations, and series with Indonesian subtitles. This is a popular #1 streaming service in Indonesia because LK21 serves thousands of films from around the world such as the US, Japan, Korea, and more for free.

</details>

<details>
  <summary><strong>Is this the Official LK21 API?</strong></summary>

NO, it's unofficial LK21 API, I fetch their films by web scraping with Node.js, [@axios](https://www.npmjs.com/package/axios), and [@cheerio](https://www.npmjs.com/package/cheerio).

</details>

<details>
  <summary><strong>What is NontonDrama?</strong></summary>
NontonDrama is another source used by LK21 to serve movie series with updated episodes.
</details>

## Showcase

> Feel free to showcase your projects here by creating a pull request.

List of projects using LK21 API:

- ?

## License

Distributed under the [MIT License](/LICENSE).

## Disclamer

The films contained in this API are obtained from the original LK21 and NontonDrama websites by web scraping. Developers using this API must follow the applicable regulations by mentioning this project or the official owner in their projects and are prohibited from abusing this API for personal benefits.

[(Back to Top)](#lk21-api)
