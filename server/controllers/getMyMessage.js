const { db } = require('../firebase-confing');

const MyMessage = async(uid, userReceiver)=>{
    try {
        const allMessages = await db.collection('messages').get();
        
        const myMessages = allMessages.docs.map(message => {
            console.log(uid)
            
            console.log(message.data())
                const messageData = message.data();
                if (messageData.sender === uid && messageData.receiver === userReceiver) {
                    return {
                        id: message.id,
                        ...messageData
                    };
                }
                // Si no es un mensaje enviado por uid o recibido por userReceiver, retornar null
                return null;
            })
            .filter(message => message !== null); // Filtrar los mensajes nulos

        return myMessages;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
}

const getMyMessage= async(req,res)=>{
    try {
        const { uid, userReceiver  } = req.body;
        console.log(uid)
        const result = await MyMessage(uid, userReceiver );
        res.status(200).json(result);
    } catch (error) {
        console.error('Error in getMyMessageHandler:', error);
        res.status(500).send('Internal Server Error');
    }
}


module.exports= getMyMessage;