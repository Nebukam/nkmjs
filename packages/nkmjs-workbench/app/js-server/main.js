const nkm = require(`@nkmjs/core/nkmserver`);
const iofs = require(`@nkmjs/server-io-fs`);

const handlers = require(`./handlers`);

class ServerProcess extends nkm.server.ServerBaseAuth0 {
    constructor(p_config) { super(p_config); }

    _RegisterIOServices(p_ioClasses) {
        p_ioClasses.push({ cl: iofs.IO });
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