// for validation
const Joi = require('joi');
const mongoose = require('mongoose');

const Quote = mongoose.model('Quote', new mongoose.Schema({
    writter: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    quotation: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 400
    }
 }));

 
function validateQuote(quote) {
    const schema = {
        writter: Joi.string().min(2).max(50).required(),
        quotation: Joi.string().min(5).max(400).required(),
    };
    
    return Joi.validate(quote, schema);
}

exports.Quote = Quote;
exports.validate = validateQuote;