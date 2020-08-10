const { Quote, validate } = require('./quote.model');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    console.log('req', req.body);
   const quotes = await Quote.find();
   res.send(quotes);
})
 
router.post('/', async (req, res) => { 
    console.log(req.body);
    const { error } = validate(req.body);
    if (error) return res.status(404).send(error.details[0].message);
/* 
    const result = await Quote.findByQuoteId('1');
    console.log(result);
    if(result) return res.status(500).send('quote already exist in DB'); */

    let quote = new Quote({
        writter: req.body.writter,
        quotation: req.body.quotation,
        quoteId: req.body.quoteId
    });
    console.log('quote oBj', quote);
    quote = await quote.save();
    res.send('New quote SuccessFully Saved');
}) 

router.put('/:id', async (req, res) => {
    const {error} = validate(req.body);
    if( error ) return res.status(404).send(errors.details[0].message);
    
    let quote = await Quote.findByIdAndUpdate(req.params.id,
    {   
        writter: req.body.writter,
        quotation: req.body.quotation
    }, 
    {   new : true });
    
    if( !quote ) return res.status(404).send('The quote with the given Id doesnt exist');
 
    res.send(quote);
})

router.delete('/:id', async (req, res) => { 
    let quote = await Quote.findByIdAndRemove(req.params.id);
    console.log(quote);
    if( !quote ) return res.status(404).send('The customer with the given Id doesnt exist');
    res.send(quote);
})
/* 
router.get('/:id', async (req, res) => { 
    let quote = await Quote.findById(req.params.id);
    if(!quote) return res.status(404).send('The quote with the given Id doesnt Exist');
    res.send(quote);
}) */

module.exports = router;