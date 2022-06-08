import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('lkdb', 'tv433559', 'iks', {
    host: 'localhost',
    port: '11212',
    dialect: 'postgres'
});

try {
    await sequelize.authenticate();     
} catch (error) {
    console.error('Nie udało się nawiązać połączenia: ', error);
}