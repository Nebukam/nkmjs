/**
 * !!! THIS CODE IS GENERATED !!!
 * Any manual modification will be overwritten during the build process.
 * If you want to customize this file behavior & contents, do so using the nkmjs.config.json.
 */

const { app } = require(`electron`);
const gotTheLock = app.requestSingleInstanceLock();
const path = require(`path`);

if (!gotTheLock) {
   app.quit();
} else {
   const MAIN_ELECTRON = require(`./%dirs.src-electron%/main`);

   new MAIN_ELECTRON({
      dirname: __dirname,
      envPath: path.join(__dirname, `../.env`),
      html: `./%htmlIndex%`,
      renderer: `%js_main%`,
      theme: '%app.theme%',
      version: '%version%',
    %config%
    });

 }