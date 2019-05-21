'use strict';

const bcrypt = require('bcryptjs');

module.exports = app => {
    const { STRING, DATE } = app.Sequelize;

    const User = app.model.define('user', {
        name: { type: STRING(30), unique: true },
        hashedPassword: STRING,
        lastSignInAt: DATE
    }, {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt',
        freezeTableName: true
    });

    // static methods
    User.register = async function (fields) {
        fields.hashedPassword = hashPassword(fields.password);
        delete fields.password;
        return await this.create(fields);
    };

    User.getUser = async function (name, password) {
        return await this.authenticate(name, password);
    };

    User.authenticate = async function (name, password) {
        const user = await this.findOne({
            where: { name },
            attributes: [ 'id', 'name', 'hashedPassword' ]
        });
        if (!user) return null;
        return bcrypt.compareSync(password, user.hashedPassword) ? (delete user.dataValues.hashedPassword && user) : null;
    };

    User.queryUser = async function (params) {
        return await this.findOne({
            where: params,
            attributes: [ 'id', 'name' ]
        });
    };

    // instance methods
    User.prototype.logSignin = async function () {
        await this.update({ lastSignInAt: new Date() });
    };

    return User;
};

function hashPassword (password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}
