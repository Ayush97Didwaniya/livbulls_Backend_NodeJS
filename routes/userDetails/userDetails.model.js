const { TermPlanForUser } = require('./termPlan.model');

// for validation
const mongoose = require('mongoose');

const UserDetail = mongoose.model('UserDetail', new mongoose.Schema({
    refered_user_lists: [ String ],
    term_plans : [ TermPlanForUser ],
    parentUser_email : { type: String },
    imageUrl: { type: String },
    contact:  { type: Number}
}));

exports.UserDetail = UserDetail;