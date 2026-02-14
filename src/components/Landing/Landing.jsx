import { Link } from "react-router";
import "./Landing.css";

import landingImg from "../../assets/land-right.png";
import headerImg from "../../assets/sb-logo.svg";

const Landing = () => {
  return (
    <div className="landing-page-wrapper">
      <main className="landing-container">
        <section className="landing-left">
          <img
            src={headerImg}
            alt="StudentBridge"
            className="landing-brand-img"
          />

          <div>
            <h1 className="landing-title">
              Connecting Students <br /> to Community Resources
            </h1>

            <p className="landing-subtitle">
              Find support services for students in your area. Browse the map,
              filter by category, and check community check-ins with status +
              notes.
            </p>

            <ul className="landing-bullets">
              <li>✅ View resources on a map and open full details</li>
              <li>✅ Search by title, address, or city + filter by category</li>
              <li>
                ✅ Sign in to add a resource and post community check-ins
                (status + note)
              </li>
            </ul>
          </div>

          <div className="landing-actions">
            <Link to="/sign-up">
              <button className="primary" type="button">
                Get Started
              </button>
            </Link>

            <p className="landing-signin">
              Already have an account?{" "}
              <Link className="landing-link" to="/sign-in">
                Sign in
              </Link>
            </p>
          </div>
        </section>

        <section className="landing-right">
          <img
            src={landingImg}
            alt="StudentBridge preview"
            className="landing-hero-img"
          />
        </section>
      </main>
    </div>
  );
};

export default Landing;
