import express, { json } from 'express';
import cors from 'cors';
import chalk from 'chalk';
import dotenv from 'dotenv';

import categories from './routes/categoriesRouter.js';
import games from './routes/gamesRouter.js';
import customers from './routes/customersRouter.js';
import rentals from './routes/rentalsRouter.js';

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.use(categories);
app.use(games);
app.use(customers);
app.use(rentals);

app.listen(process.env.PORT, () => {
    console.log(
        chalk.bold.yellow(`Server running on port ${process.env.PORT}`)
    );
});
