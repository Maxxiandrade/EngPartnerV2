const { db, fs } = require('../firebase-confing');
const { updateDoc, arrayUnion, doc } = require('firebase/firestore');

const reportUser = async (req, res) => {
    try {
        const { user, reportData } = req.body;

        const userDocRef = doc(fs, 'users', user)

        await updateDoc(userDocRef, {
            reports: arrayUnion(reportData)
        });

        res.status(200).json('Reporte agregado exitosamente');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = reportUser;
