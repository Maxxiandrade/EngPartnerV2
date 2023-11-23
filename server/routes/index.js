const {Router} = require('express');
const getAllCountries= require('../controllers/getAllCountries')
const postMessage	=require('../controllers/postMessage')
const router = Router();

router.get("/getcountries", getAllCountries)
router.post('/send-message', postMessage)


module.exports = router;