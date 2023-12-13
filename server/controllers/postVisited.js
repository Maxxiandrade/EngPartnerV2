const { db, fs } = require('../firebase-confing');
const { updateDoc, arrayUnion, doc } = require('firebase/firestore');

const postVisited = async (req, res) => {
  try {
    const { user, visitingUserData } = req.body;

    const userDocRef = doc(fs, 'users', user);

    await updateDoc(userDocRef, {
      visitingUsers: arrayUnion(visitingUserData)
    });

    res.status(200).json({ message: 'User visits updated successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = postVisited
