const { db, fs } = require('../firebase-confing');
const { updateDoc, arrayUnion, doc, collection, getDocs, query, where, getDoc, setDoc } = require('firebase/firestore');

const postRating = async (req, res) => {
    try {
        const { rating, uid } = req.body;
        const usersCollectionRef = collection(fs, 'users');
        const querySnapshot = await getDocs(query(usersCollectionRef, where('uid', '==', uid)));
        const userDoc = querySnapshot.docs[0];
        await updateDoc(doc(fs, 'users', userDoc.id),{
            didRate: true
        });
        const ratingRef = doc(fs, 'rating', 'universalRatingDocument');
        const ratingDoc = await getDoc(ratingRef);

        if (!ratingDoc.exists()) {
            await setDoc(ratingRef, { ratings: [] });
        }

        await updateDoc(ratingRef, {
            ratings: arrayUnion(rating)
        });
        res.status(200).json("ok");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = postRating;