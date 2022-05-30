import connection from '../config/database.js';
import {
    rentalSchema,
    querySchema,
    metricsQuerySchema,
} from '../schemas/rentalSchema.js';

export default class RentalsMiddleware {
    static bodyValidation = async (req, res, next) => {
        const { value, error } = rentalSchema.validate(req.body, {
            abortEarly: false,
        });

        if (error) {
            return res.status(400).json({
                message: 'Validation failed',
                error: error.details.map((err) => err.message),
            });
        }

        res.locals.rental = value;

        next();
    };

    static checkIfCustomerAndGameExists = async (req, res, next) => {
        const { gameId, customerId, daysRented } = res.locals.rental;

        try {
            const game = await connection.query(
                `SELECT * FROM games WHERE id = $1`,
                [gameId]
            );
            if (game.rows.length === 0) {
                return res.status(400).send('Game does not exist');
            }
            const customer = await connection.query(
                `SELECT * FROM customers WHERE id = $1`,
                [customerId]
            );
            if (customer.rows.length === 0) {
                return res.status(400).send('Customer does not exist');
            }

            const originalPrice = game.rows[0].pricePerDay * daysRented;

            res.locals.rental = {
                ...res.locals.rental,
                originalPrice,
            };

            next();
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    };

    static checkQueryString = async (req, res, next) => {
        const { value, error } = querySchema.validate(req.query, {
            abortEarly: false,
        });

        if (error) {
            return res.status(400).json({
                message: 'Validation failed',
                error: error.details.map((err) => err.message),
            });
        }

        res.locals.query = value;

        next();
    };

    static checkMetricsQueryString = (req, res, next) => {
        const { value, error } = metricsQuerySchema.validate(req.query, {
            abortEarly: false,
        });

        if (error) {
            return res.status(400).json({
                message: 'Validation failed',
                error: error.details.map((err) => err.message),
            });
        }

        res.locals.metricsQuery = value;

        next();
    };
}
