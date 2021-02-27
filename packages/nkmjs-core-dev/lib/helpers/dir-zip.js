const AdmZip = require('adm-zip');
const DirRead = require(`./dir-read`);

class DirZip {
    /**
     * 
     * @param {string} p_src Source directory
     * @param {string} p_dest Destination zip file
     */
    constructor(p_src, p_dest, p_cb) {

        this.paths = [];
        let zip = new AdmZip(),
            dirRead = new DirRead(p_src, null, {
                anyFile: (p_src, p_dest, p_isDir) => {
                    this.paths.push(p_src);
                }
            });

        for (let i = 0, n = this.paths.length; i < n; i++) {
            zip.addLocalFile(this.paths[i]);
        }

        zip.writeZip(p_dest, p_cb);

    }
}

module.exports = DirZip;