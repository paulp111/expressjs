const indexRouter = require('express').Router();

const indexController = require('../controllers/indexController');
indexRouter.get('/', indexController.indexMessagesGet);

// login/sign-up routes
const signUpController = require("../controllers/signUpController");
indexRouter.get('/sign-up', signUpController.signUpGet);
indexRouter.post("/sign-up", signUpController.signUpPost);  

module.exports = indexRouter;
