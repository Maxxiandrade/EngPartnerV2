const {db, fs} = require('../firebase-confing')
const {addDoc, collection} = require('firebase/firestore')
const postUser = async (req,res)=>{
    try {
        const {uid, name, lastname, age, sex, country, photo, description, isOn, isPremium, friends} = req.body;
        const usersRef = collection(fs, "users")
        
       await addDoc(usersRef,{
        uid,
        name,
        lastname,
        age,
        sex,
        country,
        photo,
        description,
        isOn,
        isPremium,
        friends
       })
       res.status(200).json("ok")
    } catch (error) {
        res.status(400).json({error: error.message})
    }

};

module.exports = postUser;