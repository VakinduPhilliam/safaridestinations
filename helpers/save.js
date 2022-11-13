const fs = require('fs');

// Locate Dataset Route
const { resolve } = require('path');
var path = require("path");

function writeData(dir, file, data) {    

    let datasetWriteRoute = resolve(`.${dir}${file}`);

    try { 
        return fs.writeFileSync(datasetWriteRoute, JSON.stringify(data)); 
    } 

    catch (err) { 
        console.log('Problem writing data to file..!')
    }

}

function readData(dir, file) {    

    let datasetReadRoute = resolve(`.${dir}${file}`);

    try { 
        return fs.readFileSync(datasetReadRoute,  'utf8');
    }

    catch (err) { 
        console.log('Problem reading data from file..!') 
    }

}

module.exports = { writeData, readData };

