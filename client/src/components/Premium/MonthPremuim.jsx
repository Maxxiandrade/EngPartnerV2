import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import axios from "axios";
import style from "./premium.module.css";
import premiumMonth from "../../assets/premiumMonth.png"


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
    <form onSubmit={handleSubmit} className={style.paymentForm}>
    <h3 className={style.formTitle}>Monthly Subscription</h3>
        <img src={premiumMonth} alt="" width="300px" height="269px"/>
        <p className={style.price}>$7,99</p>
         <CardElement className={style.cardElement}/>
        <button disabled={isVip} className={style.buyButton}>BUY</button>
    </form>

    </div>
 )
}

export default MonthPremium;