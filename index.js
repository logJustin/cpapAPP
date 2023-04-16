const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const mongoose = require('mongoose');
const methodOverride = require('method-override');


// Connection string and options
const uri = 'mongodb+srv://reynoldsjustinmichael:FsmTlRpKodjBgQTG@cpap.svikoaw.mongodb.net/CPAPdata';
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose.connect(uri, options)
    .then(() => {
        console.log('Connected to Mongo DB: CPAPdata')
    })
    .catch(err => {
        console.log('Oh no, error: ', err)
    });

app.use(express.static(path.join(__dirname, '/public')))
app.use(methodOverride('_method'));
app.use(express.urlencoded({ extended: true }))
app.use('/scripts', express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use('/icons', express.static(__dirname + '/node_modules/bootstrap-icons'));
app.use('/bsTable', express.static(__dirname + '/node_modules/bootstrap-table'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery'));

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const schemas = require('./models/schema');
const render = (route, table) => async (req, res) => {
    try {
        const dbData = await table.find({});
        res.render(route, { dbData });
    } catch (e) {
        console.log(e);
        res.render('error');
    }
};

app.get('/', render('home', schemas.Usage));
app.get('/fourteen', render('fourteen', schemas.Usage));
app.get('/thirty', render('thirty', schemas.Usage));
app.get('/database', render('database', schemas.Usage));
app.get('/parts', render('parts', schemas.Parts));

app.get('/parts/:id/edit', async (req, res) => {
    try {
        const { id } = req.params;
        const dbData = await schemas.Parts.find({});
        const part = await schemas.Parts.findById(id);
        res.render('edit', { part, dbData });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.put('/parts/:id', async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.body)
        const updatedPart = await schemas.Parts.findByIdAndUpdate(
            id,
            req.body,
            { runValidators: true, new: true }
        );
        console.log(updatedPart)
        res.redirect('/parts');
    } catch (err) {
        res.status(500).send(err.message);
    }
});





app.listen(3000, () => { console.log('On port 3000') });