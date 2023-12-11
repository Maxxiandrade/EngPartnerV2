//Visuals
import style from "./Login.module.css";
import logo from "../../assets/logo.png";
import googleLogo from "../../assets/svg/googleLogo.svg";
import astronautJetpack from "../../assets/astronaut/astronautJetpack.jpg"

//Tools
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { auth, provider, API_URL } from "../../firebase-config.js";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { db } from "../../firebase-config.js";
import Cookies from "universal-cookie";
import { setUserDataGoogleAccount, getMyUser } from "../../redux/actions/actions.js";
import { useDispatch } from "react-redux";


const Login = ({ setIsAuth }) => {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const { displayName, photoURL, uid, email } = result.user;


      // Verificar si el usuario ya está registrado con la misma uid
      const existingUserRef = doc(db, 'users', uid);
      const existingUserDoc = await getDoc(existingUserRef);

      if (existingUserDoc.exists()) {
        // Si el usuario ya está registrado con google
        console.log('El usuario ya está registrado.');

        dispatch(
          setUserDataGoogleAccount({
            email: email,
            photo: photoURL,
            uid: uid,
          })
        );

        localStorage.setItem('uid', auth?.currentUser?.uid);
        localStorage.setItem('languageChecked', false);
        cookies.set('auth-token', result.user.refreshToken);
        setIsAuth(true);
        console.log(result.user);

        dispatch(getMyUser(uid))
        await axios.put(`${API_URL}/geton`, { uid, is: 'on' });
        navigate('/home');

      } else {
        // Si el usuario no estaba registrado con google antes
        //Crea en el estado global, las variables que ya vienen dentro de su cuenta de Google.
        dispatch(setUserDataGoogleAccount({
          email: email,
          photo: photoURL,
          uid: uid,
        }));

        localStorage.setItem('uid', auth?.currentUser?.uid);
        localStorage.setItem('languageChecked', false);
        cookies.set('auth-token', result.user.refreshToken);
        setIsAuth(true);
        console.log(result.user);

        axios.put(`${API_URL}/geton`, { uid, is: 'on' });
        navigate('/createuser');
      }
      await setDoc(doc(db, "userChats", uid), {})
    } catch (error) {
      throw new Error(error);
    }
  };

  const signInWithEmail = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const uid = result.user.uid
      localStorage.setItem('uid', auth?.currentUser?.uid);
      localStorage.setItem('languageChecked', false);
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
      axios.put(`${API_URL}/geton`, { uid, is: "on" })
      dispatch(getMyUser(uid))

      await setDoc(doc(db, "userChats", uid), {})
    } catch (error) {
      throw Error(error);
    }
  };




  return (
    <>
      <div className={style.container}>
        <div className={style.textPhotoDiv}>
          <div className={style.textContainer}>
            <div className={style.iconTitleContainer}>
              <img src={logo} alt="" className={style.logo} />
              <h1>EngPartner</h1>
            </div>
            <h2 className={style.loginH2}>Welcome!</h2>
            <p>
              EngPartner is a social network that connects you with people from all over the world to practice languages. Choose two languages of your choice and experience conversations translated in real time. Our platform eliminates language barriers, allowing you to immerse yourself in new cultures and expand your language skills in a fun and interactive way. Join our global community and build new friendships through the power of language.
            </p>
          </div>
          <img src={astronautJetpack} className={style.astronaut} />
        </div>
        <div className={style.formContainer}>
          <form onSubmit={signInWithEmail} className={style.form}>
            <input
              placeholder="Email"
              type="text"
              name="email"
              id="email"
              className={style.input}
            />
            <input
              placeholder="Password"
              type="password"
              name="password"
              id="password"
              className={style.input}
            />
            <br />
            <button type="submit" className={style.button}>
              Log in
            </button>
            <button onClick={signInWithGoogle} className={style.button}>
              <img src={googleLogo} alt="" className={style.googleLogo} /> Sign in with Google
            </button>
            <br />
            <label className={style.inputSize}>Don't have an account?</label>
            <Link to="/createuser">
              <button className={style.button}>Register</button>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
