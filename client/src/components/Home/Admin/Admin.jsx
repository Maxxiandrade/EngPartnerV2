import React from 'react';
import style from './Admin.module.css'
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';

const Admin = () => {
    const isAdmin = useSelector((state) => state.users.isAdmin);

    return isAdmin ? (
        <div className={style.adminContainer}>
            <Link to='/home'>
                <button>Home</button>
            </Link>
            <h1>Admin</h1>
                
        </div>
    ) : (
        <Navigate to="/" replace={true} />
    );
};

export default Admin;