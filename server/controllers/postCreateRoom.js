const admin = require('firebase-admin');
const { db } = require('../firebase-confing');

const postCreateRoom = async (req, res) => {
  try {
    const { nameGroup, members } = req.body;

    const promises = members.map(async (member) => {
      await db.collection('users').doc(member.id).update({
        rooms: admin.firestore.FieldValue.arrayUnion(nameGroup),
      });
    });

    // Esperar a que todas las operaciones se completen
    await Promise.all(promises);

    res.status(200).json({ success: true, message: 'Rooms created successfully' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

module.exports = postCreateRoom;

