const fs = require('fs');
const path = require('path');
const axios = require('axios');

async function download(fileUrl, outputLocationPath) {
    const writer = fs.createWriteStream(outputLocationPath);
    var totalLength = 0;
    var sumLength = 0;

    return axios({

        method: 'get',
        url: fileUrl,
        responseType: 'stream',

    }).then(response => {

        //ensure that the user can call `then()` only when the file has
        //been downloaded entirely.

        return new Promise((resolve, reject) => {

            totalLength = response.headers['content-length'];
            response.data.pipe(writer);
            let error = null;

            writer.on('error', err => {
                error = err;
                writer.close();
                reject(err);
            });

            response.data.on('data', (chunk) => {
                sumLength += chunk.length;
                process.stdout.write(`    ${((sumLength / totalLength) * 100).toFixed(2)}%\r`);
            });
            writer.on('close', () => {
                if (!error) {
                    resolve(true);
                }
                //no need to call the reject here, as it will have been called in the
                //'error' stream;
            });

        });

    });
}

module.exports = download;