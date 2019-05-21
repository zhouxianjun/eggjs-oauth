'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);

    // OAuth controller
    app.get('/authorize', controller.user.authorize);
    app.post('/user/add', controller.user.add);
    // 获取token
    app.post('/oauth/token', app.oAuth2Server.token(), 'user.token');
    // 获取授权码
    app.post('/oauth/authorize', app.oAuth2Server.authorize());
    // 验证请求
    app.get('/oauth/authenticate', app.oAuth2Server.authenticate(), 'user.authenticate');
};
