const {Router} = require('express');
const getAllCountries= require('../controllers/getAllCountries')

const router = Router();

router.get("/getcountries", getAllCountries)


module.exports = router;