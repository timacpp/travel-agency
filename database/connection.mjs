import { Sequelize } from 'sequelize';
import { createTripTable, createReservationTable } from './models.mjs'

const sequelize = new Sequelize('db', 'user', 'pass', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: 'db.sqlite'
});

export default async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connected to database successfully.');

        const Trip = await createTripTable(sequelize);
        const Reservation = await createReservationTable(sequelize);

        Trip.hasMany(Reservation);
        Reservation.belongsTo(Trip);

        return {Trip, Reservation, sequelize};
    } catch (error) {
        console.log(`Failed to connect to database. ${error.message}`);
        throw error;
    }
};
