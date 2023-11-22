import { Link } from "react-router-dom";
import { auth } from '../../firebase-config.js';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import style from './Login.module.css'

const Login = () => {

    const signInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    const signInWithEmail = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            console.log(result);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <form onSubmit={signInWithEmail} className={style.form}>
                <label htmlFor="email" className={style.input}>Email</label>
                <br />
                <input type="text" name="email" id="email" className={style.input} />
                <hr />
                <label htmlFor="password"> Password</label>
                <br />
                <input type="password" name="password" id="password" className={style.input}/>
                <br />
                <button type="submit" className={style.button}>Log in</button>
            </form>
            <br />
            <p>Sign in with Google</p>
            <button onClick={signInWithGoogle} className={style.button}>Sign in</button>
            <br />
            <label htmlFor="">Don't have an account?</label>
            <Link to='/register'><button className={style.button}>Register</button></Link>
        </div>
    );
};

export default Login;
