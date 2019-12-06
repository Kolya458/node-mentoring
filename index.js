const converter = require('csvtojson');
const fs = require('fs')

const csvFilePath = './csv/node_mentoring_t1_2_input_example.csv';
const readStream = fs.createReadStream(csvFilePath);
const writeStream = fs.createWriteStream('file.txt');

readStream.pipe(converter()).pipe(writeStream).on('error', (e) => console.log(e));




