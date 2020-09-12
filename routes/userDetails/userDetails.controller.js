const { UserDetail } = require('./userDetails.model');

async function addUserDetail(refUserArr, termPlansForUserArr, parentUserEmail, imgUrl, cont) {
    console.log('add user detail called');
    const userDetail = new UserDetail({
        refered_user_lists: refUserArr,
        term_plans : termPlansForUserArr,
        parentUser_email : parentUserEmail,
        imageUrl: imgUrl,
        contact:  cont
    });
    const userdetail = await userDetail.save();
    return userdetail;
}

module.exports.addUserDetail = addUserDetail;
