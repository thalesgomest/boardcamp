import express, { json } from 'express';
import cors from 'cors';
import chalk from 'chalk';
import dotenv from 'dotenv';

import categories from './routes/categoriesRouter.js';

const app = express();
app.use(cors());
app.use(json());
dotenv.config();

app.use(categories);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(chalk.bold.yellow(`Server running on port ${port}`));
});
