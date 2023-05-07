const nkm = require(`@nkmjs/core/nkmserver`);
const iofs = require(`@nkmjs/server-io-fs`);

const handlers = require(`./handlers`);

class ServerProcess extends nkm.server.ServerBaseAuth0 {
    constructor(p_config) { super(p_config); }

    _RegisterIOServices(p_ioConfigs) {
        p_ioConfigs.push({
            cl: iofs.IO,
            config: {
                transceivers: [
                    {
                        root: `test`,
                        uid: `lol`
                    },
                    {
                        root: `nope`,
                        uid: `lol`
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

        //iofs.IO.public.

    }

}

module.exports = ServerProcess;