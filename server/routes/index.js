const {Router} = require('express');
const getAllCountries= require('../controllers/getAllCountries')
const postMessage	=require('../controllers/postMessage');
const getAllUsers = require('../controllers/getAllUsers');
const postNewUser = require('../controllers/postNewUser');
const getMyMessage = require('../controllers/getMyMessage');

const postUser = require('../controllers/postUser');
const getMyUser = require('../controllers/getMyUser');

const router = Router();

router.get('/getcountries', getAllCountries)
router.get('/users',getAllUsers)

router.post('/send-message', postMessage)
router.post('/newUser',postNewUser)
router.post('/myMessage', getMyMessage)
router.post('/createuser', postUser)
router.post('/myUser', getMyUser)

module.exports = router;