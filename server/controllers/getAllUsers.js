const {db} = require('../firebase-confing')



const Users = async () => {
    try {
      const usersCollection = await db.collection('users').get();
        console.log(usersCollection)
      const usersData = usersCollection.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      return { success: true, users: usersData };
    } catch (error) {
      console.error('Error getting all users:', error);
      return { success: false, error: 'Error getting all users' };
    }
  };





const getAllUsers = async (req,res)=>{

    try {
        const result= await Users();
        if(result.success){
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ error: result.error });

    }
}

module.exports = getAllUsers
