const {db}=require('../firebase-confing');

const myUser= async (uid)=>{
    
    try {
        const users = await db.collection('users').get()
        const filteredUsers =users.docs
            .map(user => {
            const userData = user.data();
            if (userData.uid === uid) {
                return {
                    uid: userData.uid,
                    name: userData.name,
                    lastname: userData.lastname,
                    sex: userData.sex,
                    user: userData.user,
                    country: userData.country,
                };
            }
            return null;
        }).filter(user => user !== null);
        return filteredUsers
        
    } catch (error) {
        console.log('error user')
        throw error;
    }

}

const getMyUser =async (req, res)=>{
    try {
        const {uid}=req.body
        const result= await myUser(uid)
        res.status(200).json(result)
        
    } catch (error) {
        res.status(404).send('Dont User')
    }
}
module.exports=getMyUser;