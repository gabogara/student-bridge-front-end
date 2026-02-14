import "./Footer.css";
import footerImg from "../../assets/sb-logo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner">
        <nav>
          <div className="footer-links">
            <a
              href="https://github.com/gabogara/student-bridge-front-end"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>

          <p>&copy; {currentYear} Student Bridge. All rights reserved.</p>
        </nav>

        <div>
          <img
            className="footer-logo"
            src={footerImg}
            alt="student-bridge-logo"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
