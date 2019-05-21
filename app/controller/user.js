'use strict';

const { Controller } = require('egg');

class UsersController extends Controller {

    async add () {
        const user = await this.ctx.model.User.register({
            name: 'Alone',
            password: '123456',
            age: 29,
            firstname: 'Alone',
            lastname: 'zhou'
        });
        const client = await this.ctx.model.Client.add({
            clientId: 'hyewfbgawd',
            clientSecret: 'fskefgtarwdbawydrawpdpaiuiawdtg',
            redirectUri: 'http://127.0.0.1:7002/auth/redirect',
            grants: 'password,authorization_code,refresh_token'
        });
        this.ctx.body = { user, client };
    }

    // 登录页
    async authorize () {
        const query = this.ctx.querystring;
        console.log('query: ', query);
        await this.ctx.render('oauth/login.html', { query });
    }

    async authenticate () {
        this.ctx.body = {
            msg: 'success!'
        };
    }

    async token () {
        const { accessToken: access_token, refreshToken: refresh_token, accessTokenExpiresAt } = this.ctx.state.oauth.token;
        this.ctx.body = {
            access_token,
            refresh_token,
            expires_in: accessTokenExpiresAt.getTime()
        };
    }
}

module.exports = UsersController;
