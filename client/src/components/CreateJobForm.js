import React, { useState } from 'react';
import classes from './CreateJobForm.module.css';

function CreateJobForm() {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    fetch('/api/v1/jobs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        window.location.reload(); // Refresh the page
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className={classes.createform}>
      <div className={classes.input_container}>
        <label htmlFor="company">Company</label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
        />
      </div>
      <div className={classes.input_container}>
        <label htmlFor="position">Position</label>
        <input
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className={classes.createform_submit}>
        Create Job
      </button>
    </form>
  );
}

export default CreateJobForm;
