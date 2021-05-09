// for validation
const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);
const Joi = require('joi');

var termPlanSchema = new mongoose.Schema({
    description : {
        type: String,
        required: true
    },
    planName : {
        type: String,
        required: true       
    },
	url : {
        type: String
    }
});
 
termPlanSchema.plugin(autoIncrement.plugin, 'TermPlan');

var TermPlan = mongoose.model('TermPlan', termPlanSchema);

function validateTermPlan(termPlan) {
    const schema = {
        description: Joi.string().required(),
        planName: Joi.string().required(),
        url: Joi.any()
    };
    
    return Joi.validate(termPlan, schema);
}

exports.validate = validateTermPlan;


const TermPlanSchemaForUser = mongoose.model('TermPlanForUser', new mongoose.Schema({
    status: {
        type: Boolean
    },
    planName : {
        type: String
    }
}));

exports.TermPlan = TermPlan;
exports.TermPlanForUser = TermPlanSchemaForUser;