const {db, fs} = require('../firebase-confing')
const {addDoc, collection, setDoc, getDoc, doc} = require('firebase/firestore')

const postUser = async (req, res) => {
    try {
        const { uid, email, name, lastname, age, date, sex, country, photo, description, isOn, isVip, isAdmin, user, friends, language,
        languageRead, rooms } = req.body;

        // Obtener una referencia a la colección 'users'
        const usersCollection = collection(fs, 'users');

        // Obtener una referencia a un documento específico dentro de la colección 'users' utilizando el UID como identificador
        const userDocRef = doc(usersCollection, uid);

        // Verificar si el usuario ya existe antes de agregarlo
        const existingUserDoc = await getDoc(userDocRef);
        if (existingUserDoc.exists()) {
            return res.status(400).json({ error: 'El usuario ya existe' });
        }

        // Agregar el nuevo usuario al documento
        await setDoc(userDocRef, {
            uid,
            email,
            user,
            name,
            lastname,
            age,
            date,
            sex,
            country,
            photo,
            description,
            isOn,
            isVip,
            isAdmin,
            friends,
            language,
            languageRead,
            reports:[],
            rooms
        });

        res.status(200).json('ok');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = postUser;