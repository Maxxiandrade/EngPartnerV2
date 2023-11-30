const {db, fs} = require('../firebase-confing');
const {updateDoc, doc, arrayUnion, arrayRemove} = require('firebase/firestore')

const putFriend = async(req,res)=>{
    try {
    const {uid, friendId, action} = req.body
    const usersRef =  doc(fs, 'users', uid);
    if(action === 'add'){
        await updateDoc(usersRef, {
            friends: arrayUnion(friendId)
          });
       res.status(200).json("Se agregó")
    }   
    if(action === 'remove'){
        await updateDoc(usersRef,{
            friends: arrayRemove(friendId)
        })
        res.status(200).json("Se eliminó")
    }
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = putFriend