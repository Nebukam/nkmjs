/**
 * !!! THIS CODE IS GENERATED !!!
 * Any manual modification will be overwritten during the build process.
 * If you want to customize this file behavior & contents, do so using the nkmjs.config.json.
 */

const MAIN_SERVER = require(`./%dirs.src-server%/main`);

new MAIN_SERVER({
    dirname: __dirname,
    version:'%version%',
%config%
});