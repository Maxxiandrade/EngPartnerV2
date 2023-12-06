const { db } = require("../firebase-confing");

const getUserByUsername = async (req, res) => {
  const { name } = req.query;

  if (!name) {
    return res.status(400).json({ error: "name is not being recieved" });
  }

  try {
    const usersCollection = await db
      .collection("users")
      .where("name", "==", name.toLowerCase())
      .get();

    if (usersCollection.empty) {
      return res.status(404).json({ error: "user not found" });
    }

    const userData = usersCollection.docs[0].data();

    return res.status(200).json(userData);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error when getting user name by its user name" });
  }
};

module.exports = getUserByUsername;
