const express = require('express');
const { UserDetail } = require('./userDetails.model');
const userDetailService = require('./userDetails.service');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, res, callback) => {
        callback(null, 'upload')
    },
    filename: (req, file, callback) => {
        callback(null, `livbulls_${file.originalname}`)
    },
})

var upload = multer({ storage: storage});

router.get('/:id', getByUserRefId);

// routes
function getByUserRefId(req, res, next) {
    userDetailService.getById(req.params.id)
        .then(userDetail => userDetail ? res.json(userDetail) : res.sendStatus(404))
        .catch(err => next(err));
}

router.put('/', upload.single('file'), async (req, res) => {
    var query = { _id: req.body.id };
    console.log(query);
    console.log(req.body);
    let imageUrl;
    const file = req.file;
    if(!file) { 
        imageUrl = req.body.imageUrl;
    } else {
        imageUrl = `livbulls_${req.file.originalname}`;
    }
    console.log(req.body.termPlans);
    termPlans = [];
    termPlans = req.body.termPlans.split(',');
    console.log(req.body.contact);
    let contactVal = null;
    if(req.body.contact != 'null') {
        contactVal = req.body.contact;
    }
    let uerDetail = await UserDetail.findOneAndUpdate(query, { term_plans: termPlans, 
        parentUser_email: req.body.parentUserMail, contact: contactVal, imageUrl: imageUrl}, 
        { new : true });
    console.log(uerDetail);

    if( !uerDetail ) return res.status(404).json({message: 'The userdetail with the given Id doesnt exist'});
 
    res.send(uerDetail);
})

module.exports = router;
//module.exports = addUserDetail;
