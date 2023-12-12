const { db } = require('../firebase-confing');

const getVisitingUsers = async (req, res) => {
  const { uid } = req.query; // Suponiendo que el identificador del usuario se pasa como query parameter

  if (!uid) {
    return res.status(400).json({ error: 'User ID is not being received' });
  }

  try {
    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userData = userDoc.data();
    const visitingUsers = userData.visitingUsers || []; 

    return res.status(200).json({ visitingUsers });
  } catch (error) {
    return res.status(500).json({ error: 'Error when getting visitingUsers' });
  }
};

module.exports = getVisitingUsers;

