const {db, fs} = require('../firebase-confing')


const getReported = async (req, res) => {
    try {
        const reportedUsers = [];
        const userRef = await db.collection('users').where('reports', '!=', []).get();

        userRef.forEach(doc => {
            reportedUsers.push(doc.id);
        });

        res.status(200).json(reportedUsers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getReported;