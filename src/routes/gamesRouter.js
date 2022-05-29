import { Router } from 'express';

const router = Router();

import Games from '../controllers/gamesController.js';
import GamesMiddleware from '../middlewares/gamesMiddleware.js';

router.get('/games', GamesMiddleware.checkQueryString, Games.getGames);
router.post(
    '/games',
    GamesMiddleware.bodyValidation,
    GamesMiddleware.checkIfGameExists,
    Games.postGame
);

export default router;
