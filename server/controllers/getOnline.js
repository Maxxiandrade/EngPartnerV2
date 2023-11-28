const { db, fs } = require('../firebase-confing');


const getOnline = async (req, res) => {
    try {
      let allUsers = [];
      const usersCollectionOn = await db.collection('users').where('isOn', '==', true).get();
      const usersDataOn = usersCollectionOn.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
      }));
  
      const usersCollectionOf = await db.collection('users').where('isOn', '==', false).get();
      const usersDataOf = usersCollectionOf.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      // Concatenar los arrays de usuarios conectados y no conectados
      allUsers = [...usersDataOn, ...usersDataOf];
      
      res.status(200).json(allUsers);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  



module.exports = getOnline;