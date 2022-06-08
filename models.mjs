import { DataTypes} from 'sequelize';
import { sequelize } from './db.mjs'

// const Wycieczki = sequelize.define('Wycieczki', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     nazwa: {
//         type: DataTypes.STRING,
//         allowNull: false,
//     },
//     opis: {
//         type: DataTypes.TEXT,
//         defaultValue: ""
//     },
//     ktotki_opis: {
//         type: DataTypes.STRING,
//         defaultValue: ""
//     },
//     obrazek: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     alt: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     cena: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         min: 0
//     },
//     data_poczatku: {
//         type: DataTypes.DATEONLY,
//         allowNull: false
//     },
//     data_konca: {
//         type: DataTypes.DATEONLY,
//         allowNull: false
//     },
//     liczba_dostepnych_miejsc: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         min: 0
//     }
// });

// const Zgloszenia = sequelize.define('Zgloszenia', {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     imie: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     nazwisko: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         unique: true,
//         allowNull: false,
//         validate: {
//             isEmail: true
//         }
//     },
//     liczba_miejsc: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         min: 1
//     }
// })

// await Wycieczki.sync({ force: true });
// await Zgloszenia.sync({ force: true });

// await Wycicezki.create({
//     'nazwa': 'Szczyt wszystkiego',
//     'opis': 'Krótka wycieczka z wejściem na ten właśnie szczyt.',
//     'cena': 15002900,
//     'obrazek': '/mountain',
//     'alt': 'mountain',
//     'data_poczatku': '17-01-2022',
//     'data_konca': '20-01-2022',
//     'liczba_dostepnych_miejsc': 5
// }); 

// await Wycicezki.create({
//     'nazwa': 'Dalekie morza',
//     'opis': 'Mórz jest wiele, więc i opis może być nieco dłuższy niż poprzednio. Atrakcji też może być więcej.',
//     'cena': 17,
//     'obrazek': '/sea.webp',
//     'alt': 'sea',
//     'data_poczatku': '02-03-2022',
//     'data_konca': '05-03-2022',
//     'liczba_dostepnych_miejsc': 1
// }); 

// await Wycicezki.create({
//     'nazwa': 'Miasto',
//     'opis': 'Na świecie mamy jeszcze miasta, można je zwiedzać.',
//     'cena': 3405691582,
//     'obrazek': '/city.jpg',
//     'alt': 'city',
//     'data_poczatku': '23-05-2022',
//     'data_konca': '24-01-2022',
//     'liczba_dostepnych_miejsc': 23
// }); 