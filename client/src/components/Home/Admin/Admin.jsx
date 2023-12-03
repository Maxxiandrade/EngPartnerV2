import React, { useEffect, useState } from 'react';
import style from './Admin.module.css'
import { useSelector } from 'react-redux';
import { Navigate, Link } from 'react-router-dom';
import { db } from '../../../firebase-config'
import { useDispatch } from 'react-redux';
import { getReported } from '../../../redux/actions/actions';

const Admin = () => {
    const isAdmin = useSelector((state) => state.users.isAdmin);
    const dispatch = useDispatch()
    const reportedUsers = useSelector((state)=> state.users.reported)


    useEffect(() => {
        dispatch(getReported)
        console.log(reportedUsers);
    }, []);

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