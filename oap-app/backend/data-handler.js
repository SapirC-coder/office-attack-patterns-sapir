const router = require('express').Router();
const Base = require('./database/model');
const vt = require('./virustotal');

//Getting all data
router.route('/').get((req, res) => {
    Base.find()
        .then(docs =>  res.json(docs))
        .catch(err => res.status(500).json('Error: ' + err ));
});

/* virustotal*/

router.route('/vt/:ip').get((req, res) => {
    vt.ipLookup(req.params.ip)
        .then(data =>  res.json(data))
        .catch(err => res.status(500).json('Error: ' + err ));
});

router.route('/vt/:url').get((req, res) => {
    vt.urlLookup(req.params.url)
        .then(data =>  res.json(data))
        .catch(err => res.status(500).json('Error: ' + err ));
});

router.route('/vt/:file_id').get((req, res) => {
    vt.fileLookup(req.params.file_id)
        .then(data =>  res.json(data))
        .catch(err => res.status(500).json('Error: ' + err ));
});

router.route('/vt/:domain').get((req, res) => {
    vt.domainLookup(req.params.domain)
        .then(data =>  res.json(data))
        .catch(err => res.status(500).json('Error: ' + err ));
});

module.exports = router;
