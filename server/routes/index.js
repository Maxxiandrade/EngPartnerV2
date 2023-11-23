const {Router} = require('express');
const getAllCountries= require('../controllers/getAllCountries')
const postMessage	=require('../controllers/postMessage');
const getAllUsers = require('../controllers/getAllUsers');


const router = Router();

router.get("/getcountries", getAllCountries)
router.post('/send-message', postMessage)
router.get('/users',getAllUsers)


module.exports = router;