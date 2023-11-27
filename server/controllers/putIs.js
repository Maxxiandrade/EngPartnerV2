const {db, fs} = require('../firebase-confing');
const { doc, updateDoc, getDocs, query, where, collection } = require('firebase/firestore');



const putIs = async(req,res)=>{
    try {
        const {uid, is} = req.body
        const usersCollectionRef = collection(fs, 'users');
        const querySnapshot = await getDocs(query(usersCollectionRef, where('uid', '==', uid)));
        const userDoc = querySnapshot.docs[0];

        switch(is){
            case ("on"):{
                await updateDoc(doc(fs, 'users', userDoc.id), {
                    isOn: true
                });
                res.status(200).json("Ok");
                break;}
            case ("off"):{
                await updateDoc(doc(fs, 'users', userDoc.id), {
                    isOn: false
                    
                });
                res.status(200).json("Ok")
                break;}
            case ("premium"):{
                await updateDoc(doc(fs, 'users', userDoc.id), {
                    isVip: true    
                });
                res.status(200).json("Ok")
                break;}
            case ("notPremium"):{
                await updateDoc(doc(fs, 'users', userDoc.id), {
                    isVip: false           
                });
                res.status(200).json("Ok")
                break;
            }
            default:{
                await updateDoc(doc(fs, 'users', userDoc.id), {
                    isVip: false           
                });
                await updateDoc(doc(fs, 'users', userDoc.id), {
                    isOn: false           
                });
                res.status(200).json("Ok")
            }

            break   
                }

    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

module.exports = putIs;