/**
 * !!! THIS CODE IS GENERATED !!!
 * Any manual modification will be overwritten during the build process.
 * If you want to customize this file behavior & contents, do so using the nkmjs.config.json.
 */

const MAIN_SERVER = require(`./%dirs.src-server%/main`);
const path = require(`path`);
const serverDir = path.join(__dirname, `%dirs.src-server%`);

new MAIN_SERVER({
    dirname:__dirname,
    serverDir:serverDir,
    envPath:path.join(serverDir, `/.env`),
    version:'%version%',
%config%
});