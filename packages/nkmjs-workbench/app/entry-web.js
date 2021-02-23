//
// This code will be at the root of the browserify bundle.
// (important note : this code should not be packaged for electron)
// Since it's not a constructor, it will be executed as soon as the bundle is loaded
// It emulate/compensate for what ElectronApp usually does when run in Electron.
//
// This obviously assume the execution environement has no node capabilities.
//
//

const { U, PATH, LOG } = require(`@nkmjs/utils`);
const { ENV } = require(`@nkmjs/environment`);

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
paths[PATH.STYLE] = './style';

LOG.toggle(true);

// TODO : argv should be the parsed URL.
ENV.instance.Start({
    paths: paths,
    argv: [],
    renderer: require(`./js/app`)
});