const {Router} = require('express');
const getAllCountries= require('../controllers/getAllCountries')
const postMessage	=require('../controllers/postMessage');
const getAllUsers = require('../controllers/getAllUsers');
const postNewUser = require('../controllers/postNewUser');
const getMyMessage = require('../controllers/getMyMessage');
const getOnline = require('../controllers/getOnline')
const getUserByUsername = require('../controllers/getUserByUserName');
const putIs = require('../controllers/putIs');
const postUser = require('../controllers/postUser');
const getMyUser = require('../controllers/getMyUser');
const putUser = require('../controllers/putUser')
const postPremium= require('../controllers/postPremium')
const putFriend = require('../controllers/putFriend');
const getFriends = require('../controllers/getFriends');
const getReported = require('../controllers/getReported')

const router = Router();

router.get('/getcountries', getAllCountries)
router.get('/user', getUserByUsername)
router.get('/users',getAllUsers)
router.get('/getonline', getOnline)
router.get('/friends', getFriends)
router.get('/reported', getReported)


router.post('/user', getMyUser)
router.post('/send-message', postMessage)
router.post('/newUser',postNewUser)
router.post('/myMessage', getMyMessage)
router.post('/createuser', postUser)

router.put('/geton', putIs)
router.put('/edit', putUser)
router.put('/friend', putFriend)

router.post('/newPremium',postPremium)
// route Premium

module.exports = router;