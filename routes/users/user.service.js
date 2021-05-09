const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { addUserDetail } = require('../userDetails/userDetails.service');
const { UserDetail } = require('../userDetails/userDetails.model');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    console.log(user);

    const userDetailRef = user.userDetailRef;
    console.log(userDetailRef);
    const userDetail = await UserDetail.findById(userDetailRef);
    console.log(userDetail);
    
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt. sign({ sub: user.id }, config.secret);
        return {
            ...user.toJSON(),
            ...userDetail.toJSON(),
            token
        };
    }
}

async function getAll() {
    console.log('req body');
    const users = await User.find();
    console.log(users);
    return users;
}

async function getById(id) {
    return await User.findById(id);
}

async function create(userParam) {
    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    if (await User.findOne({ email: userParam.email })) {
        throw 'Username "' + userParam.email + '" is already taken';
    }

    const userDetail = await addUserDetail([''], [''], '', '', null);
    console.log(userDetail);
    console.log('saving user');
    const user = new User({
        username: userParam.username,
        firstName: userParam.firstName,
        lastName: userParam.lastName,
        email: userParam.email,
        userDetailRef: userDetail,
        }        
    );
    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }
    await user.save();
    
    console.log(user);
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}


