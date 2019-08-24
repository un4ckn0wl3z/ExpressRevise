const Joi = require('joi');
const config = require('config');
const express = require('express');
const names = require('./routes/names');
const home = require('./routes/home');
const helmet = require('helmet');
const morgan = require('morgan');
const app = express();
const debug = require('debug')('app:startup');
const logger = require('./middleware/logger');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.set('view engine', 'pug');
app.set('views', './views');


app.use(express.static('public'));

// console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
app.use('/api/names', names);
app.use('/', home);
app.use(helmet());

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Morgan enable...');
}

// configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
console.log('Mail Password: ' + config.get('mail.password'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on port: ${port}...`);
});
