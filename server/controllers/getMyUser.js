const {db}=require('../firebase-confing');
const {API_URL}=require('../firebase-confing');
const axios= require('axios')


const isVipExpired = async (uid) => {
    try {
        console.log(uid)
        const userSnapshot = await db.collection('users').where('uid', '==', uid).get();
        const userData = userSnapshot.docs[0].data(); 
        const { timeIsVip } = userData;
        if (!timeIsVip) {
            return true;
        }
        const startDate = timeIsVip.toDate();
        const currentDate = new Date();
    

        const timeDifference = currentDate - startDate;
        const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
        const isExpired = daysDifference >= 30;
        return isExpired;
    } catch (error) {
        console.error("Error al verificar la expiración de la membresía VIP:", error);
        return false;
    }
}
const fitrueorFalse = async(userData,uid)=>{
    if(userData.isVip === true){
        if( await isVipExpired(uid)){
             await axios.put(`${API_URL}/geton`,{ uid, is:"notPremium"} )
        }
    }
}

const getMyUser = async (req, res) => {
    try {
        const { uid } = req.body;
        const userSnapshot = await db.collection('users').where('uid', '==', uid).get();
        if (userSnapshot.empty) {
            res.status(404).json({ error: 'Usuario no encontrado' });
            return;
        }
        const userData = userSnapshot.docs[0].data();
        await fitrueorFalse(userData, uid)
        
        // const { data } = await axios(`http://localhost:3001/getcountries`);
        const { data } = await axios(`${API_URL}/getcountries`);
        const cca2 = data.find((country) => country.country === userData?.country)?.cca2;
        
        
        const userInfo = {
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
            isOn: userData?.isOn,
            rooms:userData?.rooms,
            reports: userData?.reports,
            language: userData?.language,
            languageRead: userData?.languageRead,
            cca2
        }; 
        res.status(200).json(userInfo);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports=getMyUser;