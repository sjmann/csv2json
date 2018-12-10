const csv = require('csvtojson'),
    fs = require('fs'),
    path = require('path');

// Create the path to csv file, using path to ensure OS agonstic approach
const convertCSV = (inputFileName = 'customer-data.csv') => 
{
    // Check that the user has specificed a .CSV file
    if(inputFileName.substring(inputFileName.length - 4) != '.csv') return console.log('Please specify a CSV file ending in .csv');
    
    // Generate the output file name by replacing the file extension
    let outputFileName = inputFileName.replace('.csv', '.json');

    // Build the path to the csv file. CSV source data MUST be in the applications data folder
    let csvPath = path.join(__dirname, 'data', inputFileName);
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
            fs.writeFileSync(path.join(__dirname, 'data', outputFileName), fileContent, 'utf-8');
            console.log('JSON conversion complete!');
        } catch (error) {
            return console.log(error.message);
        }       
    });
}

// Call the conversion with optional user defined file name
convertCSV(process.argv[2]);


    