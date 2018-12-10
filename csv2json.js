const csv = require('csvtojson'),
    fs = require('fs'),
    path = require('path');

// Create the path to csv file, using path to ensure OS agonstic approach
const csvPath = path.join(__dirname, 'data', 'customer-data.csv');

// Chained use of csvtojson package as described in the documentation
csv()
    .fromFile(csvPath)
    // Subscribe to the error event included in csvtojson. This will catch
    // any errors related to IO operations.
    .on('error', (error) => {
        return console.error(error.message);
    })
    .then((jsonObj) => {
        console.log('Writing to file...');
        // Using stringify with the tab escape character passed to the space parameter creates a prettified JSON file output
        let fileContent = JSON.stringify(jsonObj, null, '\t');
        try {
            fs.writeFileSync(path.join(__dirname, 'data', 'customer-data.json'), fileContent, 'utf-8');
            console.log('JSON conversion complete!');
        } catch (error) {
            return console.log(error.message);
        }       
    });
    