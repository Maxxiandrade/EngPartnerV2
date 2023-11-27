const {db, fs} = require('../firebase-confing')
const {addDoc, collection, setDoc, doc} = require('firebase/firestore')
const postUser = async (req,res)=>{
    try {
        const {uid, name, lastname, age, sex, country, photo, description, isOn, isVip, user, friends} = req.body;
        const usersRef = doc(fs, "users", uid)
        
       await setDoc(usersRef,{
        uid,
        user,
        name,
        lastname,
        age,
        sex,
        country,
        photo,
        description,
        isOn,
        isVip,
        friends
       })
       res.status(200).json("ok")
    } catch (error) {
        res.status(400).json({error: error.message})
    }

};

module.exports = postUser;