import { useState, useContext } from "react";
import { useNavigate } from "react-router";

import { signIn } from "../../services/authService";

import { UserContext } from "../../contexts/UserContext";

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  
  const handleChange = (evt) => {
    setMessage("");
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const signedInUser = await signIn(formData);

      setUser(signedInUser);
      navigate("/", { replace: true });
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="page">
      <div className="form-container">
        <div className="card">
          <h1>Sign In</h1>
          {message && <p style={{ color: "#8a1f1f" }}>{message}</p>}
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                autoComplete="off"
                id="username"
                value={formData.username}
                name="username"
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                autoComplete="off"
                id="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                required
              />
            </div>
            <div className="button-row">
              <button className="primary">Sign In</button>
              <button type="button" onClick={() => navigate("/")}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default SignInForm;
