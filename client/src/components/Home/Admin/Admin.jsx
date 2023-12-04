import React, { useEffect, useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import style from './Admin.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getReported, getMyUser } from '../../../redux/actions/actions';
import axios from 'axios';

const Admin = () => {
    const uid = localStorage.getItem("uid");
    const isAdmin = useSelector((state) => state.users.isAdmin);
    const dispatch = useDispatch()
    const reportedUsers = useSelector((state)=> state.users.reported)
    const [usersToRender, setUsersToRender] = useState([]); 

    useEffect(() => {
        dispatch(getMyUser(uid));
        dispatch(getReported());
        const fetchUsers = async () => {
            const usersData = [];
            for (const user of reportedUsers) {
                try {
                    const { data } = await axios.post(`http://localhost:3001/user`, { uid: user });
                    usersData.push(data);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            }
            setUsersToRender(usersData);
        };
        fetchUsers();
    }, []);
    
    console.log(usersToRender);
    return isAdmin ? (
        <div className={style.adminContainer}>
            <Link to="/home">
                <button>Home</button>
            </Link>
            <h1>Admin panel</h1>
            <div>
                <table className={style.reportTable}>
                    <thead>
                        <tr>
                            <th>Usuario</th>
                            <th>Tipo de Reporte</th>
                            <th>Mensaje Reportado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersToRender?.map(user => (
                            <tr key={user.id}>
                                <td>{user.user}</td>
                                <td colSpan="2">
                                    <table>
                                        <tbody>
                                            {user.reports && user.reports.map(report => (
                                                <tr key={report.reportId}>
                                                    <td>{report.reportType}</td>
                                                    <td>{report.report}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    ) : (
        <Navigate to="/" replace={true} />
    );
};
export default Admin;