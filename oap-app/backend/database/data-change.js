const fs = require('fs');

const Base = require('./model');

/**
 * Initialize data using files as a single document
 *  
 * @param {String} dirPath 
 */
function initData(dirPath)
{
    Base.find().then(docs => {
        // checking if there's a need to init data in database
        if (docs.length == 0) {
            fs.readdir(dirPath, (err, files) => { //trying to read file names from directory
                
                if (err) { console.log(`Error reading files from directory: ${err}`); 
                } else {

                    files.forEach(file => {
                        fs.readFile(dirPath + file, 'utf8', (err, data) => {  //trying to read every file in directory

                            if (err) { console.log(`Error reading file from disk: ${err}`); 
                            } else {

                                const obj = JSON.parse(data);
                                
                                const doc = 
                                    new Base({
                                        name: obj.objects[0].name ? obj.objects[0].name : 'NA',
                                        description: obj.objects[0].description? obj.objects[0].description : 'NA',
                                        _id: obj.objects[0].id ? obj.objects[0].id : 'NA',
                                        x_mitre_platforms: obj.objects[0].x_mitre_platforms ? obj.objects[0].x_mitre_platforms.join(', ') : 'NA',
                                        x_mitre_detection: obj.objects[0].x_mitre_detection ? obj.objects[0].x_mitre_detection: 'NA',
                                        phase_name: obj.objects[0].kill_chain_phases? obj.objects[0].kill_chain_phases.map(elm=> elm.phase_name).join(', ') : 'NA' }); 

                                //saving the document to database
                                doc.save((err, res)=> { if(err) console.log(err); else console.log(res); }); 
                            }
                        });
                    }); 
                }
            });
        }
    });
};

//Clearing database
function clearDB() {Base.deleteMany({}, function(err) { if(err) console.log(err); else console.log('collection removed'); });};

module.exports = {
    initData,
    clearDB
};