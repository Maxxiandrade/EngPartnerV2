// eslint-disable-next-line no-unused-vars
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOnline } from "../../../redux/actions/actions";

const Users = () => {
  const users = useSelector((state) => state.users.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOnline());
  }, [dispatch]);

  return (
    <>
      <h3>Online Users</h3>
      <div>
        { users.map((user) => (
            <div key={user.id}>
              <p>{user.name}</p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Users;
