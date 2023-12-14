const { db, fs } = require('../firebase-confing');
const { updateDoc, doc, getDoc, setDoc, collection } = require('firebase/firestore');

const postRating = async (req, res) => {
    try {
        const { rating, uid } = req.body;
        const usersCollectionRef = collection(fs, 'users');
        // Resto del código para actualizar 'didRate'...

        const ratingRef = doc(fs, 'rating', 'universalRatingDocument');
        const ratingDoc = await getDoc(ratingRef);

        if (!ratingDoc.exists()) {
            await setDoc(ratingRef, { ratings: [rating] });
        } else {
            const { ratings } = ratingDoc.data();
            const updatedRatings = [...ratings, rating]; // Agregar el nuevo rating al array
            await updateDoc(ratingRef, { ratings: updatedRatings });
        }

        res.status(200).json("ok");
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = postRating;