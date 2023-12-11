const { db } = require('../firebase-confing');

const deleteReport = async (req, res) => {
    try {
        const { uid, messageId } = req.body;
        
        const userRef = db.collection('users').where('uid', '==', uid);
        const userSnapshot = await userRef.get();

        if (userSnapshot.empty) {
            return res.status(404).json('User not found');
        }

        const userDoc = userSnapshot.docs[0];
        const userData = userDoc.data();
        const reports = userData.reports || [];

        const updatedReports = reports.filter(report => report.messageId !== messageId);

        await userDoc.ref.update({ reports: updatedReports });

        res.status(200).json('Report removed');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = deleteReport;