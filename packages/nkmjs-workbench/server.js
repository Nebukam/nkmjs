/**
 * !!! THIS CODE IS GENERATED !!!
 * Any manual modification will be overwritten during the build process.
 * If you want to customize this file behavior & contents, do so using the nkmjs.config.json.
 */

const MAIN_SERVER = require(`./app/js-server/main`);
const path = require(`path`);
const dirServer = path.join(__dirname, `app/js-server`);
const dirViews = path.join(dirServer, `views`);

new MAIN_SERVER({
	dirname:__dirname,
	dirServer:dirServer,
	dirViews:dirViews,
	envPath:path.join(dirServer, `/.env`),
	version:'1.0.3',
	lang:'en',
	locales:[],
});