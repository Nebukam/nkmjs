const nkm = require(`@nkmjs/core/nkmserver`);
const iofs = require(`@nkmjs/server-io-fs`);

const handlers = require(`./handlers`);

class WorkbenchServer extends nkm.server.ServerBaseAuth0 {
    constructor(p_config) { super(p_config); }

    _RegisterIOServices(p_ioConfigs) {
        p_ioConfigs.push({
            cl: iofs.IO,
            config: {
                transceivers: [
                    {
                        root: `D:/GIT/nkmjs/packages/nkmjs-workbench/dump/`,
                        uid: `lol`,
                        prependRoot: true
                    }
                ]
            }
        });
    }

    _InitAPIs() {

        this._RegisterAPIs([
            {
                route: '/',
                fn: (req, res) => {
                    res.render('index', {
                        title: 'Auth0 Webapp sample Nodejs',
                        isAuthenticated: this.IsAuthenticated()
                    });
                }
            },
            {
                route: '/profile',
                requireAuth: true,
                fn:
                    (req, res) => {
                        console.log(req, res);
                        res.render('profile', {
                            userProfile: JSON.stringify(this.GetUser(req), null, 2),
                            title: 'Profile page'
                        });
                    },
                start: true
            },
            {
                route: `/action/page/publish/:id`,
                handler: handlers.PagePublish
            },
        ]);

    }

    _Boot() {

        iofs.IO.lol.WriteFile(
            iofs.IO.lol.Join(`a`, `b`, `c`, `test.json`),
            JSON.stringify({ property: 'value', answer: 42 }),
            (p_err, p_path, p_success) => {
                console.log(p_success);
                console.log(p_err);
                console.log(p_path);
            }, { recursive: true });

    }

}

module.exports = WorkbenchServer;