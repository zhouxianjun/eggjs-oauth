/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    const config = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = `${appInfo.name}_1557827627098_801`;

    // add your middleware config here
    config.middleware = [];

    // add your user config here
    const userConfig = {
        debug: config.env === 'local',
        grants: [ 'authorization-code' ],
        sequelize: {
            dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
            database: 'sm_wms_shop',
            host: 'rm-bp19t0g7uyyngv04eyo.mysql.rds.aliyuncs.com',
            port: 3306,
            username: 'wms_dev',
            password: 'saomao@123',
            timezone: '+08:00'
            // delegate: 'myModel', // load all models to `app[delegate]` and `ctx[delegate]`, default to `model`
            // baseDir: 'my_model', // load all files in `app/${baseDir}` as models, default to `model`
            // exclude: 'index.js', // ignore `app/${baseDir}/index.js` when load models, support glob and array
            // more sequelize options
        },
        security: {
            csrf: {
                enable: false
            }
        },
        static: { // 配置静态文件请求
            prefix: '/'
        },
        view: {
            defaultViewEngine: 'nunjucks',
            mapping: {
                '.html': 'nunjucks'
            }
        }
    };

    return {
        ...config,
        ...userConfig
    };
};
