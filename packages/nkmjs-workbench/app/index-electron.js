/**
 * !!! THIS CODE IS GENERATED !!!
 * Any manual modification will be overwritten during the build process.
 * If you want to customize this file behavior & contents, do so using the nkmjs.config.json.
 */

const MAIN_ELECTRON = require(`./js-electron/main`);

new MAIN_ELECTRON({
    dirname: __dirname,
    html: `./index-electron.html`,
    renderer: `./js/main`,
    theme: 'default',
	lang:'en',
	locales:[],

});