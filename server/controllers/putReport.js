const { db } = require('../firebase-confing');
const { doc, deleteDoc, collection } = require('firebase/firestore');

const deleteReport = async (req, res) => {
    try {
        const reportId = req.body.reportId;
        const querySnapshot = await db.collection('users')
            .where('reports', 'array-contains', { messageId: reportId })
            .get();

        if (!querySnapshot.empty) {
            const docToDelete = querySnapshot.docs[0];
            await deleteDoc(doc(db, 'users', docToDelete.id));
            res.status(200).json('eliminado');
        } else {
            res.status(404).json({error: error.message});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = deleteReport;