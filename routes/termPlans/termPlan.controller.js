const { TermPlan, validate } = require('./termPlan.model');
const express = require('express');
const multer = require('multer');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, 'C:\Users\ayush\OneDrive\Pictures\Screenshots')
    },
    filename: (req, file, callback) => {
        callback(null, `livbulls_${file.originalname}`)
    },
})

var upload = multer({ storage: storage});

router.get('/', async (req, res) => {
   console.log('req', req.body);
   const termPlans = await TermPlan.find();
   res.send(termPlans);
})

router.post('/', upload.single('file'), async (req, res) => { 
    console.log(req.body);
    if ( await TermPlan.findOne({ planName: req.body.planName }) ) {
        return res.status(400).json({ message: 'TermPlan already exist' });
    }
    console.log(req.body);
    const file = req.file;
    if(!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return res.send(error);
    }
    
    termPlan = new TermPlan({
        description: req.body.description,
        planName: req.body.planName,
        url: req.file.originalname
    });
    termPlan = await termPlan.save();
    res.send(termPlan);
}) 

router.post('/file', upload.single('file'), (req, res, next) => {
    const file = req.file;
    if(!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(file)
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