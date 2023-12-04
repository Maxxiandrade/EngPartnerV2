const { db } = require('../firebase-confing');

const postNewUser = async (req, res) => {
    try {
        
        const { uid,mail, name, lastname, age, isVip,sex,country, user, language, languageRead, rooms } = req.body;

        const result = await createUser(uid,mail,name, lastname, age, isVip,sex,country, user, language, languageRead, rooms);

        res.status(200).json(result)
    } catch (error) {
        res.status(404).send('faltan requisitos')
    }
}

const createUser= async (uid,mail, name,lastname, age, isVip,sex,country, user, language, languageRead, rooms)=>{

    try {
        const newUser= await db.collection('users').add({
            uid,
            mail,
            name, 
            lastname, 
            age, 
            isVip,
            sex,
            country,
            user,
            language,
            languageRead,
            timestamp: new Date(),
            rooms
        })
        return  newUser
        
    } catch (error) {
        console.error('Error sending user:', error);
        return { success: false, error: 'Error sending user' };
    }
}

module.exports=postNewUser;