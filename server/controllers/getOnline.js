const { db, fs } = require('../firebase-confing');


const getOnline = async (req, res) => {
  try {
    const usersCollection = await db.collection('users').where('isOn', '==', true).get();
    const usersData = usersCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
    res.status(200).json(usersData);
} catch (error) {
    res.status(400).json({error: error.message})
}
};



module.exports = getOnline;