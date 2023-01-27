import React, { useEffect } from 'react';
import classes from './Navbar.module.css';
import logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';

function Navbar() {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  useEffect(() => {
    document.title = 'My Website';
  }, []); // Run only once

  return (
    <nav>
      <div className={classes.logo_container}>
        <img src={logo} className={classes.logo} />
      </div>
      <div className={classes.options}>
        <div>
          <NavLink to="/" className={classes.jobLink}>
            All Jobs
          </NavLink>
        </div>
        <div>
          <NavLink to="/stats" className={classes.statLink}>
            Stats
          </NavLink>
        </div>
        <button type="button" onClick={logout} className={classes.logout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
