const {db}=require('../firebase-confing');

const getMyUser= async (req, res)=>{
    
    try {
        const {uid} = req.body
        const users = await db.collection('users').get()
        const filteredUsers =users.docs
            .map(user => {
            const userData = user.data();
            if (userData.uid === uid) {
                const info = {
                    uid: userData.uid,
                    name: userData.name,
                    lastname: userData.lastname,
                    sex: userData.sex,
                    user: userData.user,
                    country: userData.country,
                    photo: userData.photo,
                    description: userData.description,
                    age: userData.age
                };
                res.status(200).json(info)
            }
        })
        
    } catch (error) {
        res.status(404).json({error:error.message})
    }

}

// const getMyUser =async (req, res)=>{
//     try {
//         const {uid}=req.body
//         const result= await myUser(uid)
//         res.status(200).json(result)
        
//     } catch (error) {
//         res.status(404).send('Dont User')
//     }
// }
module.exports=getMyUser;