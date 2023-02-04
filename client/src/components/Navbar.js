import React, { useEffect } from 'react';
import classes from './Navbar.module.css';
import logo from '../images/logo.png';
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

function Navbar() {
  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  const [showMenu, setShowMenu] = useState(true);

  useEffect(() => {
    document.title = 'Job Tracker';
    if (window.innerWidth <= 900) {
      setShowMenu(false);
    } else {
      setShowMenu(true);
    }
  }, []); // Run only once

  return (
    <nav>
      <div className={classes.logo_container}>
        <img src={logo} className={classes.logo} />
      </div>
      <button
        className={classes.burger_btn}
        onClick={() => setShowMenu(!showMenu)}
      >
        {showMenu ? (
          <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
        ) : (
          <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
        )}
      </button>
      {showMenu && (
        <ul className={classes.options}>
          <li>
            <NavLink to="/" className={classes.jobLink}>
              All Jobs
            </NavLink>
          </li>
          <li>
            <NavLink to="/stats" className={classes.statLink}>
              Stats
            </NavLink>
          </li>
          <li>
            <button type="button" onClick={logout} className={classes.logout}>
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
