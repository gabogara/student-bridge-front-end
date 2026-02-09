// src/components/Dashboard/Dashboard.jsx
import { useEffect, useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import * as userService from "../../services/userService";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]); // <-- estado para la lista

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        setUsers(fetchedUsers); // <-- guardas la data
      } catch (err) {
        console.log(err);
      }
    };

    if (user) fetchUsers();
  }, [user]);

  return (
    <main>
      <h1>Welcome, {user?.username}</h1>
      <p>
        This is the dashboard page where you can see a list of all the users.
      </p>

      <ul>
        {users.map((u) => (
          <li key={u._id}>{u.username}</li>
        ))}
      </ul>
    </main>
  );
};

export default Dashboard;
