import {CardElement, useStripe, useElements} from "@stripe/react-stripe-js";
import axios from "axios";
import style from "./premium.module.css";
import premiumMonth from "../../assets/premiumMonth.png"
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useDispatch } from "react-redux";
import { setVip, getMyUser } from "../../redux/actions/actions";
import { API_URL } from "../../firebase-config";


const MonthPremium=({isVip,uid})=>{

    const dispatch = useDispatch()
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
            const {data}=await axios.post(`${API_URL}/newPremium`,{
                id,
                amount:799,
                description: 'pay for month',
                uid
            })

            if(data){
                dispatch(setVip(true));
                Swal.fire({
                    icon: 'success',
                    title: '1 month Premium subscribed successfully!',
                    text: 'Hurraa! Thank you and welcome to the premium experience!',
                    showConfirmButton: false,
                    timer: 4000, // 4 segundos
                    showCloseButton: true,
                  })
            }
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
        <button disabled={isVip} className={style.buyButton}>GET VIP</button>
    </form>

    </div>
 )
}

export default MonthPremium;