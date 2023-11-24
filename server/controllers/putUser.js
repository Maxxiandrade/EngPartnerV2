const {db, fs} = require('../firebase-confing');
const {doc, updateDoc} = require('firebase/firestore')


const putUser = async(req,res)=>{
try {
    const {id} = req.params
    const userRef = collection(fs, "users", id)

    const {name, lastname, age, sex, country, photo, description} = req.body

} catch (error) {
    res.status(400).json({error: error})
}
};

module.export = putUser