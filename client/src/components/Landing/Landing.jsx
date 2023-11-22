import { Link } from "react-router-dom";

const Landing = ()=>{
    return(
        <>
        <h1>Landing</h1>
        <Link to='/login'> <button>Login</button></Link>
        </>
    )
};

export default Landing;