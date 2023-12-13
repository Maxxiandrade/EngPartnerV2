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
                <th style={{ width: '15%' }}>User</th>
                <th style={{ width: '16.4%' }}>Report</th>
                <th style={{ width: '60%' }}>Reported message</th>
                <th style={{ width: '8%' }}>Ban</th>
              </tr>
            </thead>
            <tbody>
              {usersToRender?.map((user) => (
                <tr key={user.id}>

                  <td style={{ wordBreak: 'break-word', textAlign: 'center', fontSize:'20px' }}>
                    <Link to={`/profile/${user.uid}`}>
                      {user.user}
                    </Link>
                  </td>

                  <td colSpan="2" style={{borderRight:'none'}}>
                    <table>
                      <tbody>
                        {user.reports &&
                          user.reports.map((report) => (
                            <tr key={report.reportId}>
                              <td style={{ fontWeight: 'bold', width: '16%', textAlign: 'center' }}>{report.reportType}</td>
                              <td style={{ wordBreak: 'break-word', color: 'black', width: '50%' }}>{report.report}</td>
                              <td style={{ width: '10%', border:'none'}}>
                                <button
                                  key={report.reportId}
                                  onClick={() => handleDeleteReport(report.messageId, user.uid)}
                                  className={style.removeBtn}
                                >
                                  Remove report
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </td>

                  <td style={{borderLeft:'none'}}>
                    <button onClick={() => handleBan(user)} className={style.banBtn}>
                      Ban User
                    </button>
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