'use strict';

const oidc = require('express-openid-connect');
const env = require(`@nkmjs/environment`);

const base = require(`./server-base`);
class ServerBaseAuth0 extends base {
    constructor(p_constants) { super(p_constants); }

    _InitAuthenticationMiddleware(p_express) {

        if (this._bypassAuth) { return true; }

        this._authFn = oidc.requiresAuth;

        let authConfig = {
            authRequired: false,
            auth0Logout: true,
            baseURL: this._baseURL
        };

        // Note:
        // When using auth0 server, default auth0 routes are enabled.
        // use:
        //  href="/login" to redirect to universal login
        //  href="/logout" to logout

        p_express.use(oidc.auth(authConfig));

        return true;
    }

    GetUser(p_req) { return p_req.oidc ? p_req.oidc.user : null; }
    IsAuthenticated(p_req) { return p_req.oidc ? p_req.oidc.isAuthenticated() : false; }

    _BypassAuth() {

        this._bypassAuth = true;
        this._authFn = null;

        this.GetUser = (p_req) => {
            console.log(`huoh`);
            return {
                given_name: "Timothe",
                family_name: "Lapetite",
                nickname: "nebukam",
                name: "Timothe Lapetite",
                locale: "en-US",
                updated_at: "2023-05-09T16:43:20.988Z",
                email_verified: false,
                sub: "google-oauth2|000000000000000000000"
            };
        }

        this.IsAuthenticated = (p_req) => { return true; }

    }

}

module.exports = ServerBaseAuth0;