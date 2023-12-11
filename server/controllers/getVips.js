const { db } = require('../firebase-confing');

const getVips = async () => {
  try {
    const usersCollection = await db.collection('users').where('isVip', '==', true).get();
    const usersData = usersCollection.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));

    return { success: true, users: usersData };
  } catch (error) {
    console.error('Error getting VIP users:', error);
    return { success: false, error: 'Error getting VIP users' };
  }
};

const getVipUsers = async (req, res) => {
  try {
    const result = await getVips();
    if (result.success) {
      res.status(200).json(result.users);
    } else {
      res.status(500).json({ error: result.error });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error getting VIP users' });
  }
};

module.exports = getVipUsers;
