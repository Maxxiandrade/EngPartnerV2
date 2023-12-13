// STYLES
import style from "./Admin.module.css";

// TOOLS
import React, { useEffect, useState } from "react";
import { Navigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getReported, getMyUser, deleteReport, banUser, getVips } from "../../../redux/actions/actions";
import axios from "axios";
import { API_URL } from "../../../firebase-config";

// RENDERS
import Navbar from "../../Navbar/Navbar";
import Swal from 'sweetalert2';


const Admin = ({ setIsAuth }) => {
  const uid = localStorage.getItem("uid");
  const isAdmin = useSelector((state) => state.users.isAdmin);
  const dispatch = useDispatch();
  const reportedUsers = useSelector((state) => state.users.reported);
  const [usersToRender, setUsersToRender] = useState([]);

  useEffect(() => {
    dispatch(getVips())
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

  const handleDeleteReport = (messageId, uid) => {
    Swal.fire({
      title: `You will be approving this message`,
      icon: "warning",
      confirmButtonText: "Approve",
      confirmButtonColor: "#46c740",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "#3085d6",
      toast: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteReport(messageId, uid));
        Swal.fire({
          title: `The message was approved successfully`,
          icon: "success",
          toast: true,
          timer: 3000,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleBan = async (user) => {
    Swal.fire({
      title: `You will be banning ${user.name}, (${user.user})`,
      icon: "warning",
      confirmButtonText: "Ban user",
      confirmButtonColor: "#d33",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      cancelButtonColor: "#3085d6",
      toast: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(banUser(user?.uid))
        Swal.fire({
          title: `${user.name} has been banned`,
          icon: "success",
          toast: true,
          timer: 3000,
          showConfirmButton: false,
        });
      }
    });
  }

  const vips = useSelector((state) => state.users.vips)
  const vipLength = vips.length

  return isAdmin ? (
    <div className={style.adinMainDiv}>
      <Navbar setIsAuth={setIsAuth} />
      <div className={style.adminContainer}>
        <h1 className={style.adminH1}>Admin panel</h1>
        <div>
          <table className={style.reportTable}>
            <thead>
              <tr>
                <th>User</th>
                <th>Report</th>
                <th>Reported message</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersToRender?.map((user) => (
                <tr key={user.id}>

                  <td><Link to={`/profile/${user.uid}`}>
                    {user.user}
                  </Link>
                  </td>

                  <td colSpan="2">
                    <table>
                      <tbody>
                        {user.reports &&
                          user.reports.map((report) => (
                            <tr key={report.reportId}>
                              <td>{report.reportType}</td>
                              <td style={{wordBreak:'break-word'}}>{report.report}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </td>

                  <td>
                    <table>
                      <tbody>
                        <td style={{width:'60%', height:'100%', border:'none', padding: '5%'}}>
                      {user.reports &&
                        user.reports.map((report) => (
                          <button
                            key={report.reportId}
                            onClick={() => handleDeleteReport(report.messageId, user.uid)}
                            className={style.removeBtn}
                          >
                            Remove report
                          </button>
                        ))}
                        </td>
                        <td style={{width:'60%', height:'100%', border:'none'}}>
                      <button onClick={() => handleBan(user)} className={style.banBtn}>
                        Ban User
                      </button>
                      </td>
                      </tbody>
                    </table>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ padding: '1%', color: 'white', fontWeight: 'bold' }}>Total Vip users: {vipLength}</p>
      </div>

    </div>
  ) : (
    <Navigate to="/" replace={true} />
  );
};
export default Admin;