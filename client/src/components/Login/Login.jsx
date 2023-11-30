//Visuals
import logo from "../../assets/logo.png";
import googleLogo from "../../assets/googleLogo.svg";
import style from "./Login.module.css";

//Tools
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";
import { auth, provider } from "../../firebase-config.js";
import { doc, getDoc } from "firebase/firestore";
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
        cookies.set('auth-token', result.user.refreshToken);
        setIsAuth(true);
        console.log(result.user);
    
        dispatch(getMyUser(uid))
        await axios.put('http://localhost:3001/geton', { uid, is: 'on' });
        navigate('/home');

      }else{
        // Si el usuario no estaba registrado con google antes
        //Crea en el estado global, las variables que ya vienen dentro de su cuenta de Google.
        dispatch(setUserDataGoogleAccount({
            email: email,
            photo: photoURL,
            uid: uid,
          }));
    
        localStorage.setItem('uid', auth?.currentUser?.uid);
        cookies.set('auth-token', result.user.refreshToken);
        setIsAuth(true);
        console.log(result.user);
    
        axios.put('http://localhost:3001/geton', { uid, is: 'on' });
        navigate('/createuser');
      }
      
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
      cookies.set("auth-token", result.user.refreshToken);
      setIsAuth(true);
      axios.put('http://localhost:3001/geton',{ uid, is: "on"} )
      dispatch(getMyUser(uid))
    } catch (error) {
      throw Error(error);
    }
  };
  
  
  
  return (
    <>
      <div className={style.backgroundImg}>
        <div className={style.container}>
          <div className={style.textContainer}>
            <div className={style.iconTitleContainer}>
              <img src={logo} alt="" className={style.logo} />
              <h1>EngPartner</h1>
            </div>
            <h2>¡Bienvenido a EngPartner!</h2>
            <p>
              En EngPartner, nos apasiona conectar a personas que comparten el
              deseo de dominar el idioma inglés y mejorar sus habilidades
              lingüísticas. Nuestro objetivo es brindar un espacio interactivo y
              colaborativo donde puedas sumergirte en el mundo del inglés,
              practicar conversaciones en tiempo real y avanzar en tu
              aprendizaje de una manera divertida y efectiva.
              <br />
              <br />
              ¿Quieres perfeccionar tu inglés con hablantes nativos o compañeros
              entusiastas de aprendizaje de todo el mundo? ¡Estás en el lugar
              adecuado! Ofrecemos una plataforma de chat en tiempo real donde
              puedes conectarte con personas que comparten tu pasión por el
              idioma. Ya sea que estés buscando practicar tu pronunciación,
              mejorar tu comprensión oral o simplemente entablar conversaciones
              estimulantes, EngPartner te brinda la oportunidad de sumergirte en
              un entorno enriquecedor.
              <br />
              <br />
              Nuestros usuarios provienen de diversos lugares y culturas, lo que
              te permite no solo mejorar tu inglés, sino también explorar
              diferentes perspectivas y conocer nuevas amistades mientras
              avanzas en tu viaje lingüístico.
              <br />
              <br />
              Únete a nuestra comunidad de aprendizaje, sumérgete en
              conversaciones estimulantes y lleva tu dominio del inglés al
              siguiente nivel en EngPartner. ¡Descubre un mundo de posibilidades
              para fortalecer tus habilidades lingüísticas mientras te diviertes
              y conectas con personas de ideas afines!
            </p>
          </div>
          <div className={style.formContainer}>
            <form onSubmit={signInWithEmail} className={style.form}>
              <label htmlFor="email" className={style.inputSize}>
                Email
              </label>
              <input
                type="text"
                name="email"
                id="email"
                className={style.input}
              />
              <br />
              <label htmlFor="password" className={style.inputSize}>
                Password
              </label>
              <input
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
                <img src={googleLogo} alt="Google" className={style.googleLogo}/> Sign in with Google
              </button>
              <br />
              <label className={style.inputSize}>Don't have an account?</label>
              <Link to="/createuser">
                <button className={style.button}>Register</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
      <footer className={style.about}>
        <p>
          Developed by: Andrade Maximiliano, Britos Gaspar, D'lppolito Luciano,
          Ford Vicente, Martinez Jose, Reyes Luis.
        </p>
      </footer>
    </>
  );
};

export default Login;
