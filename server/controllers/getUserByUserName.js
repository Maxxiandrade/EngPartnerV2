const { db } = require('../firebase-confing');

const getUserByUsername = async (req, res) => {
  const { username } = req.query; // Obtener el nombre de usuario de los query parameters
  
  if (!username) {
    return res.status(400).json({ error: 'Falta el parámetro "username" en la solicitud' });
  }

  try {
    const usersCollection = await db.collection('users').where('userName', '==', username).get();

    if (usersCollection.empty) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const userData = usersCollection.docs[0].data(); // Tomamos el primer resultado ya que debería ser único por nombre de usuario
  
    return res.status(200).json(userData);
  } catch (error) {
    console.error('Error obteniendo usuario por nombre de usuario:', error);
    return res.status(500).json({ error: 'Error obteniendo usuario por nombre de usuario' });
  }
};

module.exports = getUserByUsername;

