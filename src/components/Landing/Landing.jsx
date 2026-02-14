import { Link } from "react-router";
import "./Landing.css";

import landingImg from "../../assets/land-right.png";
import headerImg from "../../assets/sb-logo.svg";

const Landing = () => {
  return (
    <div className="landing-page">
      <div className="page landing-hero">
        <section className="landing-left">
          <img src={headerImg} alt="StudentBridge" className="landing-logo" />

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

            <p className="muted">
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
      </div>

      <section className="how-section">
        <div className="page">
          <h2>How it works</h2>
          <p className="muted">
            Browse, open details, and publish records: simple steps that keep
            community resources accurate and easy to find.
          </p>

          <div className="how-grid">
            <article className="card how-card">
              <div className="how-number">1</div>
              <h3>Explore</h3>
              <p className="muted">
                Open the dashboard map, filter by category, and search by
                location text.
              </p>
            </article>

            <article className="card how-card">
              <div className="how-number">2</div>
              <h3>Check details</h3>
              <p className="muted">
                Click a marker or list item to see address, requirements, and
                check-in status.
              </p>
            </article>

            <article className="card how-card">
              <div className="how-number">3</div>
              <h3>Contribute</h3>
              <p className="muted">
                Sign in to add a resource or post a check-in with a status +
                short note.
              </p>
            </article>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
