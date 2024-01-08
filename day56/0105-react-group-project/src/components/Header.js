// import styles from "../routes/Home.module.css";
import logo from "../logo.png";
const Header = ({ backBtn }) => {
  return (
    <div>
      {" "}
      <header>
      {/* <header className={styles.header}> */}
        {backBtn && (
          <svg
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            style={{ color: "#c8c8c8", marginRight: "-53px" }}
            onClick={() => window.location.replace("/")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
        )}
        <img alt="logo" src={logo} />
      </header>
    </div>
  );
};

export default Header;
