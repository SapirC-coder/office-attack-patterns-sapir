const fs = require('fs');

const Base = require('./model');

/**
 * Initialize data using files as a single document
 *  
 * @param {String} dir_path 
 */
function init_data(dir_path)
{
    Base.find().then(docs => {if (docs.length == 0) {
        fs.readdir(dir_path, (err, files) => {  if (err) { console.log(`Error reading files from directory: ${err}`); } else {
        files.forEach(file => {
            fs.readFile(dir_path + file, 'utf8', (err, data) => {  

                if (err) { console.log(`Error reading file from disk: ${err}`); } 
                else {

                    const obj = JSON.parse(data);
                  
                    const doc = 
                    new Base({
                        name: obj.objects[0].name ? obj.objects[0].name : 'NA',
                        description: obj.objects[0].description? obj.objects[0].description : 'NA',
                        _id: obj.objects[0].id ? obj.objects[0].id : 'NA',
                        x_mitre_platforms: obj.objects[0].x_mitre_platforms ? obj.objects[0].x_mitre_platforms.join(', ') : 'NA',
                        x_mitre_detection: obj.objects[0].x_mitre_detection ? obj.objects[0].x_mitre_detection: 'NA',
                        phase_name: obj.objects[0].kill_chain_phases? obj.objects[0].kill_chain_phases.map(elm=> elm.phase_name).join(', ') : 'NA' }); 

                    //saving
                    doc.save((err, res)=> { if(err) console.log(err); else console.log(res); }); 
                }
            });
        }); 
    }});}});
};

//Clearing database
function clear_db() {Base.deleteMany({}, function(err) { if(err) console.log(err); else console.log('collection removed'); });};

module.exports = {
    init_data,
    clear_db
};