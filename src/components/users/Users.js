import { useState } from "react";
import "./Users.css";
import { useEffect } from "react";
import axios from "axios";

const USERS_API = "https://dummyjson.com/users";
const LIMIT = 10;

function Users() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    axios
      .get(USERS_API, { params: { limit: LIMIT, skip: count * LIMIT } })
      .then(({ data }) => data)
      .then(({ users }) => setUsers((oldUsers) => [...users, ...oldUsers]))
      .catch((error) => console.log(error.message));
  }, [count]);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        window.document.body.offsetHeight - 70
      ) {
        setCount(count + 1);
      }
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [users]);

  return (
    <div className="users">
      {users &&
        users.map((user, indx) => (
          <div className="user-wrapper" key={indx}>
            <div className="user-image-wrapper">
              <img alt={user.firstName} src={user.image} />
            </div>
            <div className="username-wrapper">
              <span>{`${user.firstName} ${user.lastName}`}</span>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Users;
