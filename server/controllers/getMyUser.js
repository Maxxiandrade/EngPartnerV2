const {db}=require('../firebase-confing');

//Cambiado por Vicen, con el codigo anterior no funcionaba, daba errores y crasheaba el backend:
/* node:internal/errors:490
    ErrorCaptureStackTrace(err);
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client */


const getMyUser = async (req, res) => {
    try {
        const { uid } = req.body;
        const users = await db.collection('users').get();

        let userInfo;  // Variable para almacenar la información del usuario

        users.docs.forEach(user => {
            const userData = user.data();
            if (userData.uid === uid) {
                userInfo = {
                    uid: userData?.uid,
                    email: userData?.email,
                    name: userData?.name,
                    lastname: userData?.lastname,
                    sex: userData?.sex,
                    user: userData?.user,
                    country: userData?.country,
                    photo: userData?.photo,
                    description: userData?.description,
                    age: userData?.age,
                    date: userData?.date,
                    friends: userData?.friends,
                    isVip: userData?.isVip,
                    isAdmin: userData?.isAdmin,
                    isOn: userData?.isOn
                };
            }
        });

        if (userInfo) {
            // Si se encontró la información del usuario, enviarla como respuesta
            res.status(200).json(userInfo);
        } else {
            // Si no se encontró el usuario, enviar una respuesta indicando que no se encontró
            res.status(404).json({ error: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

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