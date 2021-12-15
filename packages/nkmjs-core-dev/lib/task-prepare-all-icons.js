const ScriptBase = require(`./script-base`);
const NKMjs = require(`./nkm.js`);

class TaskPrepareAllIcons extends ScriptBase {

    constructor(p_onComplete = null) {

        super(`prepare-all-icons`, p_onComplete);
        if (this.__hasErrors || this.__shouldSkip) { return this.End(); }

        this.Run([
            `./task-prepare-icons`,
            `./task-prepare-icons-maskable`
        ], this._Bind(this.OnPreparationComplete));

    }

    OnPreparationComplete() {

        let iconList = NKMjs.Get(`icon-list`, []),
            htmlIcons = `<!-- ICONS -->\n`,
            lastSize = 0;

        // any-purpose icons
        for (let i = 0, n = iconList.length; i < n; i++) {
            let icon = iconList[i],
                s = `${icon.size}x${icon.size}`;

            // Don't link big pngs.
            if (icon.size <= 128) {
                htmlIcons += `<link rel="icon" sizes="${s}" href="icons/${s}.png"></link>\n`;
            }

            if (icon.size > lastSize) { lastSize = icon.size; }

        }

        // Apple touch icon should use maskable
        htmlIcons += `<link rel="apple-touch-icon" href="icons/${lastSize}x${lastSize}-maskable.png">`;

        NKMjs.Set(`html-icons`, htmlIcons);

        this.End();
    }

}

module.exports = TaskPrepareAllIcons;