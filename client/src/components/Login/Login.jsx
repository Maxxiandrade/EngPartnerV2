import { Link } from "react-router-dom";
import {auth, provider} from '../../firebase-config.js'
import { signInWithPopup } from "firebase/auth";
import './login.css'


const Login = ()=>{

    const signInWithGoogle = async()=>{
        const result = await signInWithPopup(auth, provider);
        console.log(result);
    };

    return(
        <div>
            <form action="">
                <label htmlFor="">Email</label>
                <br />
                <input type="text" name="" id="" />
                <hr />
                <label htmlFor="">Password</label>
                <br />
                <input type="password" />
                <br />
                <button>Log in</button>
            </form>
            <br /> 
            <p>Sign in with Google</p>
            <button onClick={signInWithGoogle}>Sign in</button>
            <br />
            <label htmlFor="">Don't have an account?</label>
            <Link to='/register'><button>Register</button></Link>

        </div>
    )
};

export default Login;