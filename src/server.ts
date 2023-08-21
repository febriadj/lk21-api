import dotenv from 'dotenv';

dotenv.config();

import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import routes from '@/routes';

const app: Application = express();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('tiny'));
app.use(cors({ origin: '*' }));

app.use(routes);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Unofficial LK21 (LayarKaca21) and NontonDrama APIs',
        data: {
            LK21_URL: process.env.LK21_URL,
            ND_URL: process.env.ND_URL,
        },
    });
});

export default app;
