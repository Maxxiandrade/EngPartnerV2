const {db, fs} = require('../firebase-confing');
const { doc, updateDoc, getDocs, query, where, collection } = require('firebase/firestore');

const putLanguageRead = async (req, res) => {
    try {
        const { uid, languageRead } = req.body;
        const usersCollectionRef = collection(fs, 'users');
        const querySnapshot = await getDocs(query(usersCollectionRef, where('uid', '==', uid)));
        const userDoc = querySnapshot.docs[0];

        await updateDoc(doc(fs, 'users', userDoc.id), {
            languageRead: languageRead
        })
        res.status(200).json("LenguageRead actualizado exitosamente");

}    catch (error) {
        res.status(400).json({ error: error.message });
}
}

module.exports = putLanguageRead