const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const names =
    [
        { id: 1, name: 'Anuwat' },
        { id: 2, name: 'Pansa' },
        { id: 3, name: 'Surachad' }
    ];

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/names', (req, res) => {
    res.send(names);
});

app.get('/api/names/:id', (req, res) => {
    const name = names.find(m => m.id === parseInt(req.params.id));
    if (!name) return res.status(404).send({ message: 'Data not found.' });
    res.send(name);
});

app.post('/api/names', (req, res) => {

    const result = validateName(req.body);

    if (result.error) {
        res.status(400).send({ message: result.error.details[0].message });
        return;
    }
    const name = {
        id: names.length + 1,
        name: req.body.name
    }
    names.push(name);
    res.status(201).send(name);
});

app.put('/api/names/:id', (req, res) => {

    const name = names.find(m => m.id === parseInt(req.params.id));
    if (!name) return res.status(404).send({ message: 'Data not found.' });

    const result = validateName(req.body);
    if (result.error) {
        res.status(400).send({ message: result.error.details[0].message });
        return;
    }

    name.name = req.body.name;
    res.status(200).send(name);

});

app.get('/api/posts/:year/:month', (req, res) => {
    const postsParams = {
        year: req.params.year,
        month: req.params.month,
        queryString: null || req.query
    }
    res.send(postsParams);
});

app.delete('/api/names/:id', (req, res) => {
    const name = names.find(m => m.id === parseInt(req.params.id));
    if (!name) return res.status(404).send({ message: 'Data not found.' });
    const nameIndex = names.indexOf(name);
    names.splice(nameIndex, 1);
    res.send(name);
});

function validateName(name) {
    const schema = {
        name: Joi.string().min(3).required()
    }

    return Joi.validate(name, schema);

}

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port: ${port}...`);
});
