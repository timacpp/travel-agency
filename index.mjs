import express from "express";
import body_parser from "body-parser";
import connect from "./database/connection.mjs"
import { check, validationResult } from "express-validator";

const { urlencoded, json } = body_parser;
const { Trip, Reservation, sequelize } = await connect();

const port = 8080;
const app = express();

app.set('view engine', 'pug');
app.set('views', './views');

app.use(json());
app.use(express.static('static'));
app.use(urlencoded({ extended: false }));

app.get('/', async (req, res) => {
    const trips = await Trip.findAll({
        order: ["start"]
    });

    res.render('home', {trips: trips});
});

app.get('(overview)+(reservation)/:tripId/', (req, res) => {
    res.redirect('/');
});

app.get('/overview/:tripId', async (req, res) => {
    const trip = await Trip.findByPk(req.params.tripId);
    res.render('overview', {trip: trip});
});

app.get('/overview/reservation/:tripId', async (req, res) => {
    res.redirect(`/reservation/${req.params.tripId}`);
});

app.get('/reservation/:tripId', async (req, res) => {
    const trip = await Trip.findByPk(req.params.tripId);
    res.render('reservation', {trip: trip});
});

app.post('/reservation/:tripId',
    check('name').notEmpty().withMessage('Imię jest obowiązkowe'),
    check('surname').notEmpty().withMessage('Nazwisko jest obowiązkowe'),
    check('tickets').isInt({ min: 0 }).withMessage('Niepoprawna liczba zgłoszeń'),
    check('email').isEmail().withMessage("Wprowadzono błędny email"),
    async (req, res) => {
        const errors = validationResult(req);
        const transaction = await sequelize.transaction();
        const trip = await Trip.findByPk(req.params.tripId, {
            transction: transaction,
            lock: true
        });

        if (!errors.isEmpty()) {
            await transaction.rollback();
            res.render('reservation', {trip: trip, error: errors.array()[0].msg});
        } else if (req.body.tickets > trip.tickets) {
            await transaction.rollback();
            res.render('reservation', {trip: trip, error: 'Nie wystarcza miejsc'});
        } else {
            try {
                const reservation = await Reservation.create({
                    name: req.body.name,
                    surname: req.body.surname,
                    phone: req.body.phone,
                    email: req.body.email,
                    tickets: req.body.tickets,
                    },
                    { transaction: transaction }
                );

                await trip.addReservation(reservation, {transaction: transaction});
                await trip.decrement('tickets', {by: req.body.tickets, transaction: transaction});
                await transaction.commit();
                res.render('reservation', {trip: trip, message: 'Zarezerwowano!'});
            } catch (err) {
                await transaction.rollback();
                console.error(err.message);
                res.render('reservation', {trip: trip, error: 'Coś poszło nie tak'});
            }
        }
    }
);

app.use((err, req, res) => {
    res.render("error", { error: err });
});

app.use((err, req, res, next) => {
    res.render("error", { error: 'Nie znaleziono strony o podanym adresie' });
});

app.listen(port, () => {
    console.log(`Started listening on port ${port}`);
});
