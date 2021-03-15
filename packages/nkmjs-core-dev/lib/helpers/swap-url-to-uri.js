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

    constructor(p_filePath, p_options) {

        this._content = ``;
        this._exts = p_options.inline;
        this._processedAny = false;

        let encodeSVG = this.EncodeSVG = this.EncodeSVG.bind(this),
            encodeRAW = this.EncodeIMG = this.EncodeRAW.bind(this),
            encoders = {
                '.svg': encodeSVG,
                '.png': encodeRAW,
                '.jpg': encodeRAW,
                '.gif': encodeRAW,
                '.otf': encodeRAW,
                '.ttf': encodeRAW
            },
            contentStr = p_options.content ? p_options.content : null;

        try {

            let dir = path.dirname(p_filePath);
            contentStr = contentStr ? contentStr : fs.readFileSync(p_filePath, 'utf8');
            
            let firstPassSplit = contentStr.split(`url("`);

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
                            limit = ext in this._exts ? this._exts[ext] : null,
                            stats = fs.statSync(targetFile),
                            encodingFn = ext in encoders ? encoders[ext] : null;

                        if (limit === null || stats.size >= limit || !encodingFn) { uri = null; }
                        else { uri = encodingFn(targetFile, u.MIME.Get(ext), url); }

                        this.constructor.seen[targetFile] = uri;

                    }

                    if (uri === null) { continue; }

                    if (p_options.swap) { uri = p_options.swap(url, uri); }

                    //console.log(`"${url}" / ${uri}`);
                    contentStr = contentStr.split(`"${url}"`).join(`${uri}`);
                    this._processedAny = true;

                } catch (e) { }

            }

        } catch (e) {  }

        if (this._processedAny) {
            if (p_options.done) { p_options.done(p_filePath, contentStr); }
        }

    }

    // Encoding functions

    EncodeSVG(targetFilePath, mime, url) {
        let data = fs.readFileSync(targetFilePath, 'utf8');
        data = data.split(`"`).join(`'`);
        data = encodeURI(data);
        data = data.split(`%20`).join(` `); // Need valid spaces
        data = data.split(`#`).join(`%23`); // And need to replace #
        return `"data:${mime.type},${data}"`;
    }

    EncodeRAW(targetFilePath, mime, url) {
        let data = Buffer.from(fs.readFileSync(targetFilePath)).toString('base64');
        return `"data:${mime.type};base64,${data}"`;
    }
}

module.exports = SwapURLtoURI;