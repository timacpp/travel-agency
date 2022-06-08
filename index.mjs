import express from "express";
import _body_parser from "body-parser";

const port = 8080;
const app = express();

const trips = [
    {'id': 0, 'name': 'Szczyt wszystkiego', 'description': 'Krótka wycieczka z wejściem na ten właśnie szczyt.', 'price': 15002900, 'src': '/mountain', 'alt': 'mountain'},
    {'id': 1, 'name': 'Dalekie morza', 'description': 'Mórz jest wiele, więc i opis może być nieco dłuższy niż poprzednio. Atrakcji też może być więcej.', 'price': 17, 'src': '/sea.webp', 'alt': 'sea'},
    {'id': 2, 'name': 'Miasto', 'description': 'Na świecie mamy jeszcze miasta, można je zwiedzać.', 'price': 3405691582, 'src': '/city.jpg', 'alt': 'city'}
];

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('static'));

app.get('/', (req, res) => {
    res.render('home', {'trips': trips});
});

app.get('(overview)+(reservation)/:tripId/', (req, res) => {
    res.redirect('/');
});

app.get('/overview/:tripId', (req, res) => {
    res.render('overview', {'trip': trips[req.locals.tripId]});
});

app.get('/overview/:trip/reservation/:tripId', (req, res) => {
    res.redirect(`reservation/${req.locals.tripId}`);
});

app.get('/reservation/:tripId', (req, res) => {
    res.render('reservation', {'trip': trips[req.locals.tripId]});
});

app.listen(port, () => {
    console.log(`Started listening on port ${port}`);
});
