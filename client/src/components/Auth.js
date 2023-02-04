import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import classes from './Auth.module.css';
import logo from '../images/logo.png';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
};

function Auth() {
  const [values, setValues] = useState(initialState);
  const [showModal, setShowModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const naviage = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const modalCloseHandler = () => {
    setShowModal(false);
    setErrorMsg('');
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      alert('Please fill out all fields');
      return;
    }

    try {
      let url = values.isMember
        ? '/api/v1/auth/login'
        : '/api/v1/auth/register';

      const { data } = await axios.post(url, {
        name,
        email,
        password,
      });
      //setFormAlert(data.msg);

      localStorage.setItem('token', data.token);
      naviage('/');
      setErrorMsg('');
    } catch (error) {
      //setFormAlert(error.response.data.msg);
      console.log(error);
      localStorage.removeItem('token');
      setErrorMsg(error.response.data);
      setShowModal(true);
    }
  };

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return errorMsg ? (
    <ReactModal
      isOpen={showModal}
      onRequestClose={modalCloseHandler}
      className={classes.modal}
      overlayClassName={classes.overlay}
      shouldCloseOnOverlayClick={true}
      ariaHideApp={false}
    >
      <button onClick={modalCloseHandler} className={classes.modal_close_btn}>
        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
      </button>
      <p>{errorMsg}</p>
    </ReactModal>
  ) : (
    <div className={classes.form_container}>
      <form className={classes.form} onSubmit={onSubmit}>
        <div className={classes.logo_container}>
          <img src={logo} className={classes.logo} />
        </div>

        <h4 className={classes.auth_heading}>
          {values.isMember ? 'Login' : 'Register'}
        </h4>
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
              autoComplete="off"
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
            autoComplete="off"
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

        <p className={classes.auth_text}>
          {values.isMember ? 'Not a member yet ?' : 'Already a member ?'}
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
