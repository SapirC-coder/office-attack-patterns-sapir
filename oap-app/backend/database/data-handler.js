const router = require('express').Router();
const Base = require('./model');

//Getting all data
router.route('/').get((req, res) => {
    Base.find()
        .then(docs =>  res.json(docs))
        .catch(err => res.status(500).json('Error: ' + err ));
});

module.exports = router;