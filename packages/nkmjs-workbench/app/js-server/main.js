const server = require(`@nkmjs/core/server`);
const handlers = require(`./handlers`);

class ServerProcess extends server.core.ServerBase {
    constructor(p_config) { super(p_config); }

    static __USE_AUTH = false;

    _Init(p_express) {

        super._Init(p_express);

        this._RegisterAPIs({

            viewHome: {
                route: '/',
                fn: (req, res) => {
                    res.render('index', {
                        title: 'Auth0 Webapp sample Nodejs',
                        isAuthenticated: req.oidc.isAuthenticated()
                    });
                }
            },

            viewProfile: {
                route: '/profile',
                requireAuth: true,
                fn:
                    (req, res) => {
                        console.log(req, res);
                        res.render('profile', {
                            userProfile: JSON.stringify(req.oidc.user, null, 2),
                            title: 'Profile page'
                        });
                    },
                start: true
            },

            actionPagePublish: {
                route: `/action/page/publish/:id`,
                handler: handlers.PagePublish
            },
        });

    }

}

module.exports = ServerProcess;