const {Router} = require('express');
//post
const postCreateRoom = require('../controllers/postCreateRoom');
const postMessage	=require('../controllers/postMessage');
const postPremium= require('../controllers/postPremium')
const postNewUser = require('../controllers/postNewUser');
const postUser = require('../controllers/postUser');
//get
const getMyMessage = require('../controllers/getMyMessage');
const getOnline = require('../controllers/getOnline')
const getUserByUsername = require('../controllers/getUserByUserName');
const getMyUser = require('../controllers/getMyUser');
const getFriends = require('../controllers/getFriends');
const getAllCountries= require('../controllers/getAllCountries')
const getAllUsers = require('../controllers/getAllUsers');
//put
const putIs = require('../controllers/putIs');
const putFriend = require('../controllers/putFriend');
const putUser = require('../controllers/putUser')


const router = Router();

router.get('/getcountries', getAllCountries)
router.get('/user', getUserByUsername)
router.get('/users',getAllUsers)
router.get('/getonline', getOnline)
router.get('/friends', getFriends)

router.post('/user', getMyUser)
router.post('/send-message', postMessage)
router.post('/newUser',postNewUser)
router.post('/myMessage', getMyMessage)
router.post('/createuser', postUser)
router.post('/createRoom',postCreateRoom)

router.put('/geton', putIs)
router.put('/edit', putUser)
router.put('/friend', putFriend)

router.post('/newPremium',postPremium)
// route Premium

module.exports=router;