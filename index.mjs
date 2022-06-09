import express from "express";
import _body_parser from "body-parser";
import connect from "./database/connection.mjs"
import Op from "sequelize"

const port = 8080;
const app = express();

const { Trip, Reservation, sequelize } = await connect();

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('static'));

app.get('/', async (req, res) => {
    const trips = await Trip.findAll({
        order: ["start"]
    });

    res.render('home', {'trips': trips});
});

app.get('(overview)+(reservation)/:tripId/', (req, res) => {
    res.redirect('/');
});

app.get('/overview/:tripId', async (req, res, next) => {
    const trip = await Trip.findByPk(req.params.tripId);

    if (trip) {
        res.render('overview', {'trip': trip});
    } else {
        next(new Error(`Nie można odnaleźć wycieczki z id: ${req.params.tripId}`));
    }
});

app.get('/overview/reservation/:tripId', async (req, res) => {
    res.redirect(`/reservation/${req.params.tripId}`);
});

app.get('/reservation/:tripId', async (req, res, next) => {
    const trip = await Trip.findByPk(req.params.tripId);
    
    if (trip) {
        res.render('reservation', {'trip': trip});
    } else {
        next(new Error(`Nie można odnaleźć wycieczki z id: ${req.params.tripId}`));
    }
});

// TODO
app.post('/reservation/:tripId', async (req, res) => {});

app.use((err, req, res) => {
    res.render("error", { error: err });
});

app.use((err, req, res, next) => {
    res.render("error", { error: "Nie znaleziono strony o podanym adresie" });
});

app.listen(port, () => {
    console.log(`Started listening on port ${port}`);
});
