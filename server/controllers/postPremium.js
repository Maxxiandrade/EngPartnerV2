const Stripe =require('stripe')
const axios= require('axios')
const stripe = new Stripe('sk_test_51OFi4pDa4OdRCPg7OQSDUPZS3kRvbSeSreLAIbSv6tiRuuvtHIjWmqzaW15PUo3siDnFmlF8YJkVdZDFruvIVIXo00HBDgnEAM')

const postPremium =  async (req, res) => {
    // you can get more data to find in a database, and so on
    const { id, amount,description, uid } = req.body;
    
    try {
      
      const payment = await stripe.paymentIntents.create({
        amount,
        currency: "USD",
        description: description ,
        payment_method: id,
        confirm: true, //confirm the payment at the same time
        return_url:'http://localhost:5173/home'// cambiar en el deploy a la url de /home
      });
      axios.put('http://localhost:3001/geton',{ uid, is:"premium"} )
  
  
      return res.status(200).json({ message: "Successful Payment" });
    } catch (error) {
      return res.json({ message: error.raw.message });
    }
  };
module.exports = postPremium