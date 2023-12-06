const { db } = require('../firebase-confing');
const getMyUser = require('./getMyUser');

const deleteReport = async (req, res) => {
    const { reportId, userId } = req.body; 
    try {
        const user =  getMyUser(userId);
        res.status(200).json('joya');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = deleteReport;