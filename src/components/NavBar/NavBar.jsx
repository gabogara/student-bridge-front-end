import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";

import { UserContext } from "../../contexts/UserContext";
import "./NavBar.css";
import logo from "../../assets/sb_logo.svg";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.pathname + location.search;

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" state={from}>
          <img src={logo} alt="student-bridge-logo" className="nav-logo" />
        </Link>
      </div>
      {user ? (
        <>
          <div className="nav-right">
            <ul className="nav-links">
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/resources">RESOURCES</Link>
              </li>
              <li>
                <Link to="/resources/new" state={{ from }}>
                  NEW RESOURCE
                </Link>
              </li>
              <li>
                <Link to="/" onClick={handleSignOut}>
                  Sign Out
                </Link>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <ul>
          <li>
            <Link to="/sign-in">SIGN IN</Link>
          </li>
          <li>
            <Link to="/sign-up">SIGN UP</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
