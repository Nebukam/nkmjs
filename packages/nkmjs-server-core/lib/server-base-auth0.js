'use strict';

const oidc = require('express-openid-connect');

const base = require(`./server-base`);
class ServerBaseAuth0 extends base{
    constructor(p_constants) { super(p_constants); }

    _InitAuthenticationMiddleware(p_express) {

        this._authFn = oidc.requiresAuth;

        let authConfig = {
            authRequired: false,
            auth0Logout: true,
            baseURL: this._baseURL
        };

        p_express.use(oidc.auth(authConfig));

        // Add middleware to make the `user` object available for all views
        this._express.use(function (req, res, next) {
            res.locals.user = this.GetUser(req);
            next();
        });

        return true;
    }

    GetUser(p_req) { return p_req.oidc.user; }
    IsAuthenticated(p_req) { return p_req.oidc.isAuthenticated(); }


}

module.exports = ServerBaseAuth0;