import PropTypes from "prop-types";
// import './App.css'
import { Link } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Navigation = ({ navItems }) => {
  const { isAuth } = useAuth();

  return (
    <>
      <nav>
        <div className="navBar">
          <Link to="/">
            <img
              className="logo"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMDCB7KPoHjJAtiJk5DhwB5s6epxhFWu7SQjoPNnnKnotPsO-4mdS6GmbNtG2XfiF0vXE&usqp=CAU"
            />
          </Link>
          <h2 className="h2">Pet MD</h2>
          <div>
            <div className="nav-text">
              {/* {navItems.map((link, index) => {
                return (
                  <p className="nav-text" key={`${index}`}>
                    <Link to={link.url}>{link.title}</Link>
                  </p>
                );
              })} */}
              <Link to="/about" className="nav-text">
                About
              </Link>
              <Link to="/users/add" className="nav-text">
                Sign-up
              </Link>
              {isAuth ? (
                <Link to="/profile" className="nav-text">
                  Profile
                </Link>
              ) : (
                <Link to="/login"></Link>
              )}
            </div>
          </div>
          <Link to="./login">
            <button className="sign-in">Log In</button>
          </Link>
        </div>
      </nav>
    </>
  );
};
Navigation.propTypes = {
  navItems: PropTypes.array,
};

export default Navigation;
