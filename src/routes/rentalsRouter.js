import { Router } from 'express';

import Rentals from '../controllers/rentalsController.js';
import RentalsMiddleware from '../middlewares/rentalsMiddleware.js';

const router = Router();

router.get('/rentals', RentalsMiddleware.checkQueryString, Rentals.getRentals);
router.post(
    '/rentals',
    RentalsMiddleware.bodyValidation,
    RentalsMiddleware.checkIfCustomerAndGameExists,
    Rentals.postRental
);

router.post('/rentals/:id/return', Rentals.returnRental);
router.delete('/rentals/:id', Rentals.deleteRental);

export default router;
