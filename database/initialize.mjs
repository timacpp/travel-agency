import connect from './connection.mjs'

const { Trip, Reservation, sequelize } = await connect();

async function initialize() {
   try {
        await sequelize.sync({force:true});

        await Trip.create({
            name: 'Szczyt wszystkiego',
            description: 'Krótka wycieczka z wejściem na ten właśnie szczyt.',
            price: 15002900,
            image: '/mountain.jpg',
            alt: 'mountain',
            start: new Date('2023-01-17'),
            end: new Date('2023-01-20'),
            tickets: 5
        }); 
        
        const sea = await Trip.create({
            name: 'Dalekie morza',
            description: 'Mórz jest wiele, więc i opis może być nieco dłuższy niż poprzednio. Atrakcji też może być więcej.',
            price: 17,
            image: '/sea.jpeg',
            alt: 'sea',
            start: new Date('2022-03-02'),
            end: new Date('2022-03-05'),
            tickets: 1
        }); 
        
        const city = await Trip.create({
            name: 'Miasto',
            description: 'Na świecie mamy jeszcze miasta, można je zwiedzać.',
            price: 3405691582,
            image: '/city.jpg',
            alt: 'city',
            start: new Date('2022-08-23'),
            end: new Date('2022-08-24'),
            tickets: 3
        }); 

        const alan = await Reservation.create({
            name: 'Alan',
            surname: 'Turing',
            email: 'alan.t@gmail.com',
            phone: '123123123',
            tickets: 2
        })

        const sierpinski = await Reservation.create({
            name: 'Waclaw',
            surname: 'Sierpienski',
            email: 'waclaw.s@wp.pl',
            phone: '321312321',
            tickets: 3
        });

        await city.addReservation(sierpinski);
        await sea.addReservation(alan);
    }
    catch (error) {
        console.log(`Failed to initialize the database. ${error.message}`);
    }
};

initialize();


