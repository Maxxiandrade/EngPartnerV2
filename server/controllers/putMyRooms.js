const admin = require('firebase-admin');
const { db } = require('../firebase-confing');
const putMyRooms = async (req, res) => {
    try {
      const { room, uid } = req.body;
  
      await db.collection('users').doc(uid).update({
        rooms:  admin.firestore.FieldValue.arrayRemove(room),
      });
  
      res.status(200).json({ success: true, message: 'Room removed successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };

  module.exports = putMyRooms;