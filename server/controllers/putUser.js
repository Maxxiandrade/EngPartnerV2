const { db, fs } = require('../firebase-confing');
const { doc, updateDoc, setDoc, getDocs, collection, query, where } = require('firebase/firestore');

const putUser = async (req, res) => {
  try {
    const { name, lastname, description, uid } = req.body;

    const usersCollectionRef = collection(fs, 'users');
    const querySnapshot = await getDocs(query(usersCollectionRef, where('uid', '==', uid)));
    const userDoc = querySnapshot.docs[0];

    await updateDoc(doc(fs, "users", uid), {
      name: name,
      lastname, lastname,
      description: description
    });

    res.status(200).json("Guardado exitosamente");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = putUser;