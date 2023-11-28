import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import axios from "axios";
import { useSelector } from "react-redux";

const AnnualPremium=()=>{
const uid = useSelector((state) => state.users.uid);

const stripe  = useStripe()
const elements = useElements()

const handleSubmit = async (e) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
    });
    if(!error){
        console.log(paymentMethod)
        const {id}= paymentMethod  
        try {
            const {data}=await axios.post('http://localhost:3001/newPremium',{
                id,
                amount:6699,
            })
            console.log(data);
        } catch (error) {
            console.log(error);
        }      
    }

}
 return( 
    <form onSubmit={handleSubmit}>
        <img src="https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2015/05/ShutUpAndTakeMyMoney.jpg" alt="" width="300px" />
        <p>$66,99</p>
         <CardElement/>
        <button>
            BUY
        </button>
    </form>
 )
}

export default AnnualPremium;