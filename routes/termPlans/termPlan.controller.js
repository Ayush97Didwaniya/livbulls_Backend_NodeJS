const { TermPlan, validate } = require('./termPlan.model');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
   console.log('req', req.body);
   const termPlans = await TermPlan.find();
   res.send(termPlans);
})

router.post('/', async (req, res) => { 
    console.log(req.body);
    const { error } = validate(req.body);
    if (error) return res.status(404).json({ message: error.details[0].message });
   
    if ( await TermPlan.findOne({ planName: req.body.planName }) ) {
        return res.status(400).json({ message: 'TermPlan already exist' });
    }

    termPlan = new TermPlan({
        description: req.body.description,
        planName: req.body.planName,
        url: req.body.url
    });
    termPlan = await termPlan.save();
    res.send(termPlan);
}) 

router.put('/', async (req, res) => {
    var query = { _id: req.body.id };
    let termPlan = await TermPlan.findOneAndUpdate(query, { description: req.body.description, planName: req.body.planName, url: req.body.url  }, 
        { new : true });
    console.log(termPlan);

    if( !termPlan ) return res.status(404).json({message: 'The term plan with the given Id doesnt exist'});
 
    res.send(termPlan);
})

router.delete('/:id', async (req, res) => { 
   // var query = { _id: req.param.id };
//
    let termPlan = await TermPlan.findByIdAndRemove(req.params.id);
    console.log(termPlan);
    if( !termPlan ) return res.status(404).json({ message: 'The TermPlan with the given Id doesnt exist' });
    res.send(termPlan);
})

module.exports = router;