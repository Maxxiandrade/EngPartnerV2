const admin = require('firebase-admin');
const { db } = require('../firebase-confing');

const postBan = async (req, res) => {
  try {
    const {uid, action} = req.body;
    if(action === 'ban'){
    await admin.auth().updateUser(uid, { disabled: true });
    res.status(200).json('Usuario deshabilitado exitosamente');
    }else{
        await admin.auth().updateUser(uid, { disabled: false });
    res.status(200).json('Usuario habilitado exitosamente');
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = postBan;