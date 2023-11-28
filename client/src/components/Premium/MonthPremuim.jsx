import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import axios from "axios";
import style from "./premium.module.css";

const MonthPremium=({isVip,uid})=>{

const stripe  = useStripe()
const elements = useElements()

const handleSubmit = async (e) => {
    e.preventDefault()
    const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
    });
    if(!error){
        console.log(uid)
        const {id}= paymentMethod  
        try {
            const {data}=await axios.post('http://localhost:3001/newPremium',{
                id,
                amount:799,
                description: 'pay for month',
                uid
            })
        } catch (error) {
            console.log(error);
        }      
    }

}
 return( 
    <div className={style.conainer_form}>
    <form onSubmit={handleSubmit} >
    <h3>PAY FOR UNE MONTH</h3>
        <img src="https://d15shllkswkct0.cloudfront.net/wp-content/blogs.dir/1/files/2015/05/ShutUpAndTakeMyMoney.jpg" alt="" width="300px" />
        <p>$7,99</p>
         <CardElement/>
        <button 
        disabled={isVip}
        >
            BUY
        </button>
    </form>

    </div>
 )
}

export default MonthPremium;