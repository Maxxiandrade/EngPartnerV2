const {db} = require('../firebase-confing')


const getFriends = async(req,res)=>{
    try {
     const {uid} = req.query;

     const userDoc = await db.collection('users').doc(uid).get();
     const userData = userDoc.data();
     const friendUIDs = userData.friends || [];
     const friendsData = [];
     for (const friendUID of friendUIDs) {
        const friendDoc = await db.collection('users').doc(friendUID).get();
  
        if (friendDoc.exists) {
          const friendData = friendDoc.data();
          friendsData.push({
            id: friendUID,
            photo: friendData.photo,
            user: friendData.user,
            name: friendData.name,
            isOn: friendData.isOn,
          });
        }
      }
      res.status(200).json(friendsData)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

module.exports = getFriends;