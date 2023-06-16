import React from "react";
import { Link, NavLink } from "react-router-dom";
import { logout } from "../services/loginService";

const NavBar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        Vidly
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <div className="nav-item">
            {" "}
            <NavLink className="nav-link" to="/movies">
              Movies
            </NavLink>
          </div>

          <div className="nav-item">
            {" "}
            <NavLink className="nav-link" to="/genre">
              Add Genres
            </NavLink>
          </div>

          <div className="nav-item">
            {" "}
            <NavLink className="nav-link" to="/rentals">
              Rentals
            </NavLink>
          </div>

          {!user && (
            <>
              <div className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </div>

              <div className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </div>
            </>
          )}
          {user && (
            <>
              <div className="nav-item">
                <NavLink className="nav-link" to="/profile">
                  {user.name}
                </NavLink>
              </div>

              <div className="nav-item" onClick={()=>{
                logout()
                window.location = "/";
              }}>
               <NavLink className="nav-link" to="/">
                  Logout
 </NavLink>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
