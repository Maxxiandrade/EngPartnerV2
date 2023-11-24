// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../redux/actions/actions";

const Users = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <>
      <h1>Online Users</h1>
      <div>
        {Array.isArray(users) &&
          users.map((user) => (
            <div key={user.id}>
              <p>Name: {user.name}</p>
              <p>UID: {user.uid}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Users;
