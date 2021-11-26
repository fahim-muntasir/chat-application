//external import
const router = require('express').Router();

//internal import 
const service = require('../services/render');
const avatarUpload = require('../controller/avatarUpload');
const {userValidation, userValidationHandler, loginValidation, loginValidationHandler} = require('../controller/userValidation');
const controller = require('../controller/controller');
const decerateHtmlResponse = require('../services/common/decorateHtmlResponse');
const {loginUser, logout, rediractLogin} = require('../controller/loginUser');
const checkLogin = require('../services/common/checkLogin');
const userSearch = require('../controller/userSearch');
const create_conversation = require('../controller/create_conversation');
const get_messages = require('../services/get_messages');
const attestmentUploader = require('../controller/attestmentUpload');
const send_message = require('../controller/sendMessage');

//render router
router.get('/', decerateHtmlResponse("Login"), rediractLogin, service.index);
router.get('/inbox', decerateHtmlResponse("Inbox"), checkLogin, service.inbox);
//login route
router.post('/', decerateHtmlResponse("Login"), loginValidation, loginValidationHandler, loginUser);
//logout route
router.delete('/', logout);
//API
router.post('/api/user', checkLogin, avatarUpload, userValidation, userValidationHandler, controller.create);
router.post('/api/search', userSearch);
router.post('/api/conversation', checkLogin, create_conversation);
router.get('/api/getmessage/:conversation_id', checkLogin, get_messages);
router.post('/message', checkLogin, attestmentUploader, send_message);


module.exports = router;