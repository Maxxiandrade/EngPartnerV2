const {db, fs} = require('../firebase-confing')
const {addDoc, collection, query, where} = require('firebase/firestore')
const postUser = async (req,res)=>{
    try {
        const {name, lastname, age, sex, country, photo, description} = req.body;
        const usersRef = collection(fs, "users")
        
       await addDoc(usersRef,{
        name,
        lastname,
        age,
        sex,
        country,
        photo,
        description
       })
       res.status(200).json("todo bien")
    } catch (error) {
        res.status(400).json({error: error.message})
    }

};

module.exports = postUser;