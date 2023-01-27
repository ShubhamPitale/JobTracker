import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classes from './Auth.module.css';
import logo from '../images/logo.png';
const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

function Auth() {
  const [values, setValues] = useState(initialState);
  const [formAlert, setFormAlert] = useState('');
  const naviage = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      alert('Please fill out all fields');
      return;
    }

    console.log(email, password);

    try {
      let url = values.isMember
        ? '/api/v1/auth/login'
        : '/api/v1/auth/register';

      const { data } = await axios.post(url, {
        name,
        email,
        password,
      });
      console.log(data.user);
      //setFormAlert(data.msg);

      localStorage.setItem('token', data.token);
      naviage('/');
    } catch (error) {
      //setFormAlert(error.response.data.msg);
      console.log('Error');
      localStorage.removeItem('token');
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <div className={classes.form_container}>
      <form className={classes.form} onSubmit={onSubmit}>
        <div className={classes.logo_container}>
          <img src={logo} className={classes.logo} />
        </div>

        <h3 className={classes.auth_heading}>
          {values.isMember ? 'Login' : 'Register'}
        </h3>
        {/* name field */}
        {!values.isMember && (
          <div className={classes.input_container}>
            <label className={classes.labels}>Name</label>
            <input
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange}
              className={classes.input_name}
            />
          </div>
        )}
        {/* email field */}
        <div className={classes.input_container}>
          <label className={classes.labels}>Email</label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className={classes.input_email}
          />
        </div>

        {/* password field */}
        <div className={classes.input_container}>
          <label className={classes.labels}>Password</label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleChange}
            className={classes.input_password}
          />
        </div>
        <input type="submit" hidden />

        <button type="submit" className={classes.auth_submit_btn}>
          Submit
        </button>
        <div className={classes.divider}></div>

        <p>
          {values.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button
            type="button"
            onClick={toggleMember}
            className={classes.auth_toggle_btn}
          >
            {values.isMember ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </div>
  );
}

export default Auth;
