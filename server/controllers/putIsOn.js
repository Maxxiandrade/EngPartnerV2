const {db, fs} = require('../firebase-confing');
const { doc, updateDoc, getDocs, query, where, collection } = require('firebase/firestore');



const putIsOn = async(req,res)=>{
    try {
        const {uid, on} = req.body
        const usersCollectionRef = collection(fs, 'users');
        const querySnapshot = await getDocs(query(usersCollectionRef, where('uid', '==', uid)));
        const userDoc = querySnapshot.docs[0];
        if(on){
        await updateDoc(doc(fs, 'users', userDoc.id), {
            isOn: true
        });}else{
        await updateDoc(doc(fs, 'users', userDoc.id), {
            isOn: false
        });}
        res.status(200).json("todo bien")

    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

module.exports = putIsOn