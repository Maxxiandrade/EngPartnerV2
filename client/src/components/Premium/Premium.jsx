import { loadStripe } from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";
import AnnualPremium from "./AnnualPremium";

const stripePromise = loadStripe("pk_test_51OFi4pDa4OdRCPg7S1mBe55Usd8TeiSRRVlUiw6q3vJT7cHD7pdJqY5mdRaFBrmLMF9717TAW7Qg1GNXXfiTxzgF00K8IQSPkR");


function Premiun() {
    return (
      <Elements stripe={stripePromise}>
            <AnnualPremium/>
      </Elements>
    )
}

export default Premiun;
