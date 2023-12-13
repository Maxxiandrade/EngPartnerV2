const {Router} = require('express');
//post
const postCreateRoom = require('../controllers/postCreateRoom');
const postMessage	=require('../controllers/postMessage');
const postPremium= require('../controllers/postPremium')
const postNewUser = require('../controllers/postNewUser');
const postUser = require('../controllers/postUser');
const postReport = require('../controllers/postReport');
const postVisited = require('../controllers/postVisited')
const getVisitingUsers = require('../controllers/getVisitingUsers')
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
const putLanguage = require('../controllers/putLanguage');
const putLanguageRead = require('../controllers/putLanguageRead');
const putMyRooms= require('../controllers/putMyRooms')

const getReported = require('../controllers/getReported');
const deleteReport = require('../controllers/deleteReport');
const postBan = require('../controllers/postBan');
const getVipUsers = require('../controllers/getVips');

const router = Router();

router.get('/getcountries', getAllCountries)
router.get('/user', getUserByUsername)
router.get('/users',getAllUsers)
router.get('/getonline', getOnline)
router.get('/friends', getFriends)
router.get('/reported', getReported)
router.get('/vips', getVipUsers)
router.get('/user/visitingusers', getVisitingUsers)

router.post('/user', getMyUser)
router.post('/send-messgetMyUserage', postMessage)
router.post('/newUser',postNewUser)
router.post('/myMessage', getMyMessage)
router.post('/createuser', postUser)
router.post('/reports', postReport)
router.post('/createRoom',postCreateRoom)
router.post('/newPremium',postPremium)
router.post('/ban', postBan)
router.post('/profile', postVisited)



router.put('/geton', putIs)
router.put('/edit', putUser)
router.put('/friend', putFriend)
router.put('/language', putLanguage)
router.put('/languageread', putLanguageRead)
router.put('/deleteRoom',putMyRooms)

router.delete('/report', deleteReport)
// route Premium

module.exports=router;