const nvt = require('node-virustotal');

const key = '226a4e0604c10d5a0d591142a536ae4f909eda3fc6b8e533e471c2bcece0fc98';

const instance = nvt.makeAPI().setKey(key);

function output(err, res) {
    if (err) {
        return err.json();
    }
    return res;
}

/**
 * This function takes an IPv4 address. 
 * The IPv4 address is looked up in VirusTotal's database, 
 * and the information is returned in res.
 * @param {string} ip 
 */
function ipLookup(ip) {
    instance.ipLookup(ip, output(err, res));
}

/**
 * This function takes a URL and hashing it. 
 * The URL is looked up in VirusTotal's database, 
 * and the information is returned in res.
 * @param {string} url 
 */
function urlLookup(url) {
    const hashed = nvt.sha256(url);
    instance.urlLookup(hashed, output(err, res));
}

/**
 * This function takes a file ID. 
 * The file is looked up in VirusTotal's database, 
 * and the information is returned in res.
 * @param {string} file_id 
 */
function fileLookup(file_id) {
    instance.fileLookup(file_id, output(err, res));
}

/**
 * This function takes a domain. 
 * The domain is looked up in VirusTotal's database, 
 * and the information is returned in res.
 * @param {string} domain
 */
function domainLookup(domain) {
    instance.domainLookup(domain, output(err, res));
}

module.exports = [
    ipLookup,
    urlLookup,
    fileLookup,
    domainLookup
];