require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('upload/'));

app.use('/api/quotes', require('./routes/quote/quote.controller'));

// term plan Routes 
app.use('/api/termPlan', require('./routes/termPlans/termPlan.controller'));

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('./routes/users/users.controller'));

// global error handler
app.use(errorHandler);

// start server detail
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
