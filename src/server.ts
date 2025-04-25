import express from 'express';
import { Routes } from './globalRoutes';
import morgan from 'morgan';

require('dotenv').config(); 

const app = express();
const routes = new Routes();

app.use(morgan('dev'));
app.use(express.json());

app.use("/", routes.config());

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
