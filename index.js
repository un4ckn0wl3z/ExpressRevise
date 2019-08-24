const express = require('express');
const app = express();

const names =
    [
        { id: 1, names: 'Anuwat' },
        { id: 2, names: 'Pansa' },
        { id: 3, names: 'Surachad' }
    ];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/names', (req, res) => {
    res.send(names);
});

app.get('/api/names/:id', (req, res) => {
    const name = names.find(m => m.id === parseInt(req.params.id));
    if (!name) res.status(404).send({ message: 'Data not found.' });
    res.send(name);
});

app.get('/api/posts/:year/:month', (req, res) => {
    const postsParams = {
        year: req.params.year,
        month: req.params.month,
        queryString: null || req.query
    }
    res.send(postsParams);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port: ${port}...`);
});
