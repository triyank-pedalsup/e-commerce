import express from 'express';
import { Routes } from './globalRoutes';
import morgan from 'morgan';
import { RateLimitHelper } from './helpers/rate-limiter.helper';
import cookieParser from 'cookie-parser';

require('dotenv').config(); 

const app = express();
const routes = new Routes();

app.set('trust proxy', 1);

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

app.use(new RateLimitHelper().limiter)
app.use("/", routes.config());

const port = Number(process.env.PORT) || 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
