const { db, fs } = require('../firebase-confing');
const { updateDoc, doc, getDoc, setDoc, collection, getDocs, query, where } = require('firebase/firestore');

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
            await setDoc(ratingRef, { ratings: [rating] });
        } else {
            const { ratings } = ratingDoc.data();
            const updatedRatings = [...ratings, rating]; 
            await updateDoc(ratingRef, { ratings: updatedRatings });
        }

        res.status(200).json("ok");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = postRating;