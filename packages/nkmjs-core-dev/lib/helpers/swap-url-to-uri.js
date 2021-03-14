// Go through any .css files, try to parse url() schemes to find urls 
// find the corresponding resource, relative to the currently parsed css file
// inline resource and remove it (we're working with compiled styles anyway) so they don't get included in the PWA cache.
'use strict';

const fs = require(`fs`);
const path = require(`path`);
const u = require(`@nkmjs/utils`);

const DirRead = require("./dir-read");

// color swap in svg
class SwapURLtoURI {

    static seen = {};

    constructor(p_filePath, p_doneFn, p_swapFn = null) {

        let encodeSVG = this.EncodeSVG = this.EncodeSVG.bind(this),
            encodeRAW = this.EncodeIMG = this.EncodeRAW.bind(this),
            encoders = {
                '.svg': encodeSVG,
                '.png': encodeRAW,
                '.jpg': encodeRAW,
                '.gif': encodeRAW,
                '.otf': encodeRAW,
                '.ttf': encodeRAW
            };

        try {

            let dir = path.dirname(p_filePath),
                contentStr = fs.readFileSync(p_filePath, 'utf8'),
                firstPassSplit = contentStr.split(`url("`);

            firstPassSplit.shift(); // remove first bit, we don't need to process it.

            for (let i = 0, n = firstPassSplit.length; i < n; i++) {

                try {

                    let url = firstPassSplit[i].split(`")`)[0],
                        targetFile = path.resolve(dir, url),
                        uri = null;

                    if (targetFile in this.constructor.seen) {

                        uri = this.constructor.seen[targetFile];

                    } else {

                        let ext = path.extname(targetFile),
                            stats = fs.statSync(targetFile),
                            encodingFn = ext in encoders ? encoders[ext] : null;

                        if (stats.size >= 2000 || !encodingFn) { uri = null; }
                        else { uri = encodingFn(targetFile, u.MIME.Get(ext), url); }

                        this.constructor.seen[targetFile] = uri;

                    }

                    if (uri === null) { continue; }

                    if (p_swapFn !== null) { uri = p_swapFn(url, uri); }

                    console.log(`"${url}"`);
                    contentStr = contentStr.split(`"${url}"`).join(`"${uri}"`);

                } catch (e) { }

            }

            p_doneFn(p_filePath, contentStr);

        } catch (e) { console.log(e); }

    }

    // Encoding functions

    EncodeSVG(targetFilePath, mime, url) {
        let data = fs.readFileSync(targetFilePath, 'utf8');
        data = data.split(`"`).join(`'`);
        return `data:${mime.type};utf8,${data}`;
    }

    EncodeRAW(targetFilePath, mime, url) {
        let data = Buffer.from(fs.readFileSync(targetFilePath)).toString('base64');
        return `data:${mime.type};base64,${data}`;
    }
}

module.exports = SwapURLtoURI;