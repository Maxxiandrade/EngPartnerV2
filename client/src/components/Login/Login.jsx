/* eslint-disable react/no-unescaped-entities */
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
        
       <>
       <div>

                <h1>EngPartner</h1>
                <h2>¡Bienvenido a EngPartner!</h2>
       </div>
            <div className={style.container}>
                <p>
                    En EngPartner, nos apasiona conectar a personas que comparten el deseo de dominar el idioma inglés y mejorar sus habilidades lingüísticas. Nuestro objetivo es brindar un espacio interactivo y colaborativo donde puedas sumergirte en el mundo del inglés, practicar conversaciones en tiempo real y avanzar en tu aprendizaje de una manera divertida y efectiva.
                    <br /><br />
                    ¿Quieres perfeccionar tu inglés con hablantes nativos o compañeros entusiastas de aprendizaje de todo el mundo? ¡Estás en el lugar adecuado! Ofrecemos una plataforma de chat en tiempo real donde puedes conectarte con personas que comparten tu pasión por el idioma. Ya sea que estés buscando practicar tu pronunciación, mejorar tu comprensión oral o simplemente entablar conversaciones estimulantes, EngPartner te brinda la oportunidad de sumergirte en un entorno enriquecedor.
                    <br /><br />
                    Nuestros usuarios provienen de diversos lugares y culturas, lo que te permite no solo mejorar tu inglés, sino también explorar diferentes perspectivas y conocer nuevas amistades mientras avanzas en tu viaje lingüístico.
                    <br /><br />
                    Únete a nuestra comunidad de aprendizaje, sumérgete en conversaciones estimulantes y lleva tu dominio del inglés al siguiente nivel en EngPartner. ¡Descubre un mundo de posibilidades para fortalecer tus habilidades lingüísticas mientras te diviertes y conectas con personas de ideas afines!
                </p>
            <div>
                <form onSubmit={signInWithEmail} className={style.form}>
                    <label htmlFor="email" className={style.input}>Email</label>
                    <br />
                    <input type="text" name="email" id="email" className={style.input} />
                    <hr />
                    <label htmlFor="password">Password</label>
                    <br />
                    <input type="password" name="password" id="password" className={style.input} />
                    <br />
                    <button type="submit" className={style.button}>Log in</button>
                </form>
                <br />
                <p className={style.input}>Sign in with Google</p>
                <button onClick={signInWithGoogle} className={style.button}>Sign in</button>
                <br />
                <label className={style.input}>Don't have an account?</label>
                <Link to='/register'><button className={style.button}>Register</button></Link>
            </div>
            <div>
                <h1></h1>
            </div>
            </div>
        </>
    );
};

export default Login;
