/**
 * !!! THIS CODE IS GENERATED !!!
 * Any manual modification will be overwritten during the build process.
 * If you want to customize this file behavior & contents, do so using the nkmjs.config.json.
 */

require(`@nkmjs/core`);
const { PATH, LOG } = nkm.u;
const { ENV } = nkm.env;

let paths = {};

paths.exe = '';
paths[PATH.APP] = '';
paths[PATH.HOME] = '';
paths[PATH.APP_DATA] = '';
paths[PATH.USER_DATA] = '';
paths[PATH.TEMP] = '';
paths[PATH.DESKTOP] = '';
paths[PATH.DOCUMENTS] = '';
paths[PATH.DOWNLOADS] = '';
paths[PATH.MUSIC] = '';
paths[PATH.PICTURES] = '';
paths[PATH.VIDEOS] = '';
paths[PATH.LOGS] = '';
paths[PATH.STYLE] = '%dirs.style%';

LOG.toggle(true);

// TODO : argv should be the parsed URL.
ENV.Start({
    paths: paths,
    argv: [],
    renderer: require(`%js_main%`),
    theme: '%app.theme%',
    version:'%version%',
%config%
});