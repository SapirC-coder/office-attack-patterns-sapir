const router = require('express').Router();
const Base = require('./database/model');
const nvt = require('node-virustotal');

const key = '226a4e0604c10d5a0d591142a536ae4f909eda3fc6b8e533e471c2bcece0fc98';
const instance = nvt.makeAPI().setKey(key);

//Getting all data of database
router.route('/').get((req, res) => {
    Base.find()
        .then(docs =>  res.json(docs))
        .catch(err => res.status(500).json('Error: ' + err ));
});

/* virustotal*/

/**
* IPv4 address is looked up in VirusTotal's database, 
* and the information is returned in res.
*/
router.route('/vt-ip/:ip').get((req, res) => {
    instance.ipLookup(req.params.ip, (err, vt_result) => {
        return res.json(JSON.parse(vt_result).data.attributes.last_analysis_stats);
    })
});

/**
* hashed URL is looked up in VirusTotal's database, 
* and the information is returned in res.
*/
router.route('/vt-url/:url').get((req, res) => {
    instance.urlLookup(req.params.url, (err, vt_result) => {
        return res.json(JSON.parse(vt_result).data.attributes.last_analysis_stats);
    })
});

/**
* domain is looked up in VirusTotal's database, 
* and the information is returned in res.
*/
router.route('/vt-domain/:domain').get((req, res) => {
    instance.domainLookup(req.params.domain, (err, vt_result) => {
        return res.json(JSON.parse(vt_result).data.attributes.last_analysis_stats);
    })
});

module.exports = router;
