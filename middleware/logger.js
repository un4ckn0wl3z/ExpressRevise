const debug = require('debug')('app:startup');

function log(req, res, next) {
    if (req.body) {
        debug('Request: ' + JSON.stringify(req.body));
    }
    if (res.locals) {
        debug('Response: ' + JSON.stringify(res.locals));
    }
    next();
}

module.exports = log;