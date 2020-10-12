const config = require('config.json');
const { UserDetail } = require('../userDetails//userDetails.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('_helpers/db');
const { addUserDetail } = require('../userDetails/userDetails.controller');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};


class UserJSON {
    constructor(firstName, lastName, email, createdDate, refered_user_lists, parentUser_email,
        imageUrl, contact, term_plans) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.createdDate = createdDate;
        this.referedUserLists = refered_user_lists;
        this.parentUserEmail = parentUser_email;
        this.imageUrl = imageUrl;
        this.contact = contact;
        this.termplans = term_plans;
    }
}

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
    const arrayList = [];
for (const item of users){
    
    const userDetailRef = item.userDetailRef;
   // console.log(userDetailRef);
    const userDetail = await UserDetail.findById(userDetailRef);
   // console.log(userDetail);

    var userObject = new UserJSON(item.firstName, item.lastName, item.email,item.createdDate,
        userDetail.refered_user_lists,userDetail.parentUser_email,userDetail.imageUrl,userDetail.contact,
        userDetail.term_plans);
       // console.log(userObject);
       
    arrayList.push(userObject);
}  
 return arrayList;
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
    console.log('saveing user');
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