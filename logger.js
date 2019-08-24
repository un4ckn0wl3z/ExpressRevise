function log(req, res, next) {
    if (req.body) {
        console.log('Request: ' + JSON.stringify(req.body));
    }
    if (res.locals) {
        console.log('Response: ' + JSON.stringify(res.locals));
    }
    next();
}

module.exports = log;