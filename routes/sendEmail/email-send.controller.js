const express = require('express');
const router = express.Router();
const emailSendservice = require('./email-send.service');

// routes
router.post('', sendEmailFn);

module.exports = router;

function sendEmailFn(req, res, next) {
    emailSendservice.sendEmailFn(req.body)
        .then((data, err) => {
            console.log('controllerData', data);
            console.log('controllerData', err);
            if (err) {
                res.status(400).json({ result: 'error'});
            } else  {
                res.json({result: 'success'});
            }
        })
        .catch(err => next(err));
}
