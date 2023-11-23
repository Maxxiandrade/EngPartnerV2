const { db } = require('../firebase-confing');

const sendMessage = async (senderUid, message, receiverUid) => {
    try {
        const senderRef = db.collection('users').doc(senderUid)
        const receiverRef = db.collection('users').doc(receiverUid);

        if (!senderRef.id || !receiverRef.id) {
            throw new Error('Invalid senderUid or receiverUid');
        }

        const messageRef = await db.collection('messages').add({
            sender: senderRef,
            receiver: receiverRef,
            text: message,
            timestamp: new Date(),
        });
        return { success: true, messageId: messageRef.id }
    } catch (error) {
        console.error('Error sending message:', error);
        return { success: false, error: 'Error sending message' };
    }
}

 const postMessage = async (req, res) => {
    try {
        
        const { senderUid, message, receiverUid } = req.body;

        const result = await sendMessage(senderUid, message, receiverUid);

        res.status(200).json(result)
    } catch (error) {
        res.status(404).send('Dont Message')
    }
}

module.exports = postMessage;