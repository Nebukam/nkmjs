const fs = require(`fs`);
const path = require(`path`);

class FSUTILS {
    constructor() { }

    /**
     * @description Create a directory, with all the missing directories on the way
     * @param {string|array} p_path 
     */
    static ensuredir(p_path) {

        if (Array.isArray(p_path)) {
            for (let i = 0, n = p_path.length; i < n; i++) { this.ensuredir(p_path[i]); }
            return p_path;
        }

        try {
            if (!fs.statSync(p_path).isDirectory()) { throw new Error(); }
        } catch (e) {

            let pathArray = p_path.split(path.sep),
                concatPath = ``;

            for (let i = 0, n = pathArray.length; i < n; i++) {
                concatPath = i == 0 ? pathArray[i] : concatPath + path.sep + pathArray[i];
                if (concatPath == ``) { continue; }
                let stats;
                try {
                    if (!fs.statSync(concatPath).isDirectory()) { throw new Error(); }
                } catch (e) {
                    try {
                        fs.mkdirSync(concatPath);
                    } catch (e) {
                        throw e;
                    }
                }
            }
        }

        return p_path;

    }

    /**
     * @description copySync a source file to a destination file
     * @param {string} p_src 
     * @param {string} p_dest 
     */
    static copy(p_src, p_dest) {
        this.ensuredir(path.dirname(p_src));
        fs.copyFileSync(p_dest, p_src);
    }

    /**
     * @description Ensure a file exists at a location
     * @param {string} p_path 
     * @param {string} p_defaultContentPath 
     * @param {function} p_preProcess Specify this to load the content of the source file and pre-process it before writing it to the destination,
     * i.e if you need to replace stuff inside it.
     * @param {string} p_encoding 
     */
    static ensurefile(p_path, p_defaultContentPath, p_preProcess = null, p_encoding = 'utf8') {
        try {
            fs.statSync(p_path);
        } catch (e) {
            this.ensuredir(path.dirname(p_path));
            if (p_preProcess) {
                fs.writeFileSync(p_path, p_preProcess(fs.readFileSync(p_defaultContentPath, p_encoding)), p_encoding);
            } else {
                fs.copyFileSync(p_path, p_src);
            }
        }
    }

    static rmdir(p_path) {
        try {
            let dirContent = fs.readdirSync(p_path);
            for (let i = 0, n = dirContent.length; i < n; i++) {
                let item = dirContent[i],
                    itemPath = path.resolve(p_path, item),
                    stats = fs.statSync(itemPath);
                if (stats.isDirectory()) { this.rmdir(itemPath); }
                else { fs.unlinkSync(itemPath); }
            }
            fs.rmdirSync(p_path);
        } catch (e) { }
    }

}

module.exports = FSUTILS;