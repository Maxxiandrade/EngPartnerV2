import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import style from "./premium.module.css";
import premiumAnnual from "../../assets/premiumAnnual.png"
import Swal from 'sweetalert2';
import { useDispatch } from "react-redux";
import { setVip } from "../../redux/actions/actions";


const AnnualPremium=({isVip,uid})=>{

    const dispatch = useDispatch()
    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: elements.getElement(CardElement),
        });
        if (!error) {
            console.log(paymentMethod)
            const { id } = paymentMethod
            try {
                const { data } = await axios.post('http://localhost:3001/newPremium', {
                    id,
                    amount: 6699,
                    description: 'pay for year',
                    uid
                })
                if(data){
                    dispatch(setVip(true));
                    Swal.fire({
                        icon: 'success',
                        title: '1 year Premium subscribed successfully!',
                        text: 'Hurraa! Thank you and welcome to the premium experience!',
                        showConfirmButton: false,
                        timer: 4000, // 4 segundos
                        showCloseButton: true,
                    }).then(() => {
                        setTimeout(() => {
                            dispatch(getMyUser(localStorage.getItem("uid")))
                        }, 1000);
                    })
                }
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className={style.conainer_form}>
            <form onSubmit={handleSubmit} className={style.paymentForm}>
                <p className={style.discount}>30% off</p>
                <h3 className={style.formTitle}>Annual Subscription</h3>
                <img src={premiumAnnual} alt="" className={style.paymentImage} width="300px" />
                <p className={style.price}>$66.99</p>
                <CardElement className={style.cardElement} />
                <button disabled={isVip} className={style.buyButton}> BUY </button>
            </form>

        </div>
    )
}

export default AnnualPremium;