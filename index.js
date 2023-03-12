const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
// const db_name = path.join(__dirname, "data", "000001_patient.db");


// const db = new sqlite3.Database(db_name, err => {
const db = new sqlite3.Database('C:/Users/reyno/Documents/iMatrix/PATIENT/000001/000001_patient.db', err => {
    if (err) {
        return console.error(err.message);
    }
    console.log("Successful connection to the database '000001_patient.db'");
});



app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/icons', express.static(__dirname + '/node_modules/bootstrap-icons'));
app.use(express.static(path.join(__dirname, '/public')))

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// change test

app.get('/', (req, res) => {

    const sql = "SELECT * FROM statTable"
    db.all(sql, [], (err, dbData) => {
        if (err) {
            return console.error(err.message);
        }
        res.render('home', { dbData })
    })

})
app.get('/fourteen', (req, res) => {

    const sql = "SELECT * FROM statTable"
    db.all(sql, [], (err, dbData) => {
        if (err) {
            return console.error(err.message);
        }
        res.render('fourteen', { dbData })
    })

})

app.get('/thirty', (req, res) => {

    const sql = "SELECT * FROM statTable"
    db.all(sql, [], (err, dbData) => {
        if (err) {
            return console.error(err.message);
        }
        res.render('thirty', { dbData })
    })

})

app.get('/database', (req, res) => {

    const sql = "SELECT * FROM statTable"
    db.all(sql, [], (err, dbData) => {
        if (err) {
            return console.error(err.message);
        }
        res.render('database', { dbData })
    })

})

app.listen(3000, () => {
    console.log('On port 3000')
})

// db.close((err) => {
    // if (err) {
        // return console.error(err.message);
    // }
    // console.log('Close the database connection.');
// });