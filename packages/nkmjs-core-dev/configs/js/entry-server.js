/**
 * !!! THIS CODE IS GENERATED !!!
 * Any manual modification will be overwritten during the build process.
 * If you want to customize this file behavior & contents, do so using the nkmjs.config.json.
 */

const MAIN_SERVER = require(`./%dirs.src-server%/main`);
const path = require(`path`);
const dirServer = path.join(__dirname, `%dirs.src-server%`);

new MAIN_SERVER({
    dirname:__dirname,
    dirServer:dirServer,
    dirViews:`%dirs.src-views%`,
    envPath:path.join(dirServer, `/.env`),
    version:'%version%',
%config%
});