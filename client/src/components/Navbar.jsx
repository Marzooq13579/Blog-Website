import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory()
  const renderList = () => {
    if (state) {
      return [
        <li className="nav-item">
          <Link to="/create">Create Post</Link>
        </li>,
        <li>
          <button
            className="btn #c62828 red darken-3"
            onClick={() => {
              localStorage.clear();
              dispatch({ type: "CLEAR" })
              history.push('/signin')   
            }}
          >
            Logout
          </button>
        </li>,
      ];
    } else {
      return [
        <li className="nav-item">
          <Link to="/signin">Login</Link>
        </li>,
        <li className="nav-item">
          <Link to="/signup">Signup</Link>
        </li>,
      ];
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-wrapper white" id="mobile">
        <Link to={state ? "/" : "/signin"} className="brand-logo left">
          Website
        </Link>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
