// STYLES
import style from "./Admin.module.css";

// TOOLS
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReported, getMyUser, deleteReport } from "../../../redux/actions/actions";
import axios from "axios";
import { API_URL } from "../../../firebase-config";

// RENDERS
import Navbar from "../../Navbar/Navbar";

const Admin = ({ setIsAuth }) => {
  const uid = localStorage.getItem("uid");
  const isAdmin = useSelector((state) => state.users.isAdmin);
  const dispatch = useDispatch();
  const reportedUsers = useSelector((state) => state.users.reported);
  const [usersToRender, setUsersToRender] = useState([]);

  useEffect(() => {
    dispatch(getMyUser(uid));
    dispatch(getReported());
    const fetchUsers = async () => {
      const usersData = [];
      for (const user of reportedUsers) {
        try {
          const { data } = await axios.post(`${API_URL}/user`, { uid: user });
          usersData.push(data);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
      setUsersToRender(usersData);
    };
    fetchUsers();
  }, []);

  const handleDeleteReport = ( messageId, uid ) => {
    console.log(messageId, uid);
    dispatch(deleteReport(messageId, uid));
  };

  return isAdmin ? (
    <div className={style.adinMainDiv}>
      <Navbar setIsAuth={setIsAuth} />
      <div className={style.adminContainer}>
        <h1 className={style.adminH1}>Admin panel</h1>
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
              {usersToRender?.map((user) => (
                <tr key={user.id}>
                  <td>{user.user}</td>
                  <td colSpan="2">
                    <table>
                      <tbody>
                        {user.reports &&
                          user.reports.map((report) => (
                            <tr key={report.reportId}>
                    <button onClick={() => handleDeleteReport(report.messageId, user.uid)}>
                      Remove report 
                    </button>
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
    </div>
  ) : (
    <Navigate to="/" replace={true} />
  );
};
export default Admin;
