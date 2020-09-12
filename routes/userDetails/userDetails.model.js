// for validation
const mongoose = require('mongoose');

const UserDetail = mongoose.model('UserDetail', new mongoose.Schema({
    refered_user_lists: [ String ],
    term_plans : [ String ],
    parentUser_email : String,
    imageUrl: String,
    contact:  Number
}));

exports.UserDetail = UserDetail;