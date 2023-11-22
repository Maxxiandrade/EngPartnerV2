const {Router} = require('express');
const {getAllContries}= require('../handels/controlers')

const router = Router();

router.get("/getcountries", getAllContries)


module.exports = router;