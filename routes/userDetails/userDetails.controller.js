const { UserDetail } = require('./userDetails.model');
const express = require('express');
const router = express.Router();
module.exports = router;

async function addUserDetail(refUserArr, termPlansForUserArr, parentUserEmail, imgUrl, cont) {
    const termPlan = new UserDetail({
        refered_user_lists: refUserArr,
        term_plans : termPlansForUserArr,
        parentUser_email : parentUserEmail,
        imageUrl: imgUrl,
        contact:  cont
    });
    
    const result = await termPlan.save();
    console.log(result);
}

module.exports.addUserDetail = addUserDetail;
