const fs = require(`fs`);


class FileBackup {

    constructor() {
        this._pairList = [];
        this._alreadyBackedUp = {};
    }

    Backup(p_path) {

        try {

            let originalPath = p_path,
                backupPath = p_path + `.bak`;

            if (!(originalPath in this._alreadyBackedUp)) {

                this._pairList.push({
                    origin: originalPath,
                    backup: backupPath
                });

                this._alreadyBackedUp[originalPath] = true;
                fs.copyFileSync(originalPath, backupPath);

            }

            return true;

        } catch (e) {
            return false;
        }

    }

    Restore() {

        for (let i = 0, n = this._pairList.length; i < n; i++) {
            let pair = this._pairList[i];
            try { fs.unlinkSync(pair.origin); } catch (e) { console.log(e); }
            try { fs.renameSync(pair.backup, pair.origin); } catch (e) { console.log(e); }
        }

        this._pairList.length = 0;
        this._alreadyBackedUp = {};

    }


}

module.exports = FileBackup;