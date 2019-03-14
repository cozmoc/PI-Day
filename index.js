const pi = require('./pi');

const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

app.use(bodyParser.json({extended: true}))
app.use(express.static(path.join(__dirname, '/client')));

app.get('/', (req, res) => {
	res.render('/index.html', {root : __dirname + '/client'});
});

app.get('/api/date', (req, res) => {
    const date = req.query.date.split('/').map(e => e.slice(-2)).join('');
    let digit = pi.indexOf(date);
    if (digit > -1) {
        res.send({
            data: {
                digit,
                chunk: pi.substr(digit - 100, 200),
                date
            }
        });
    } else {
        res.sendStatus(400);
    }
});

app.listen(port, () => console.log(`app listening on port ${port}!`))
