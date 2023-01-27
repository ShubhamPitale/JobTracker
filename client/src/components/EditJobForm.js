import React, { useState } from 'react';
import classes from './EditJobForm.module.css';

function EditJobForm({ job }) {
  const [formData, setFormData] = useState({
    company: job.company,
    position: job.position,
    status: job.status,
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
    fetch(`/api/v1/jobs/${job._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className={classes.editform}>
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
          type="text"
          id="position"
          name="position"
          value={formData.position}
          onChange={handleChange}
        />
      </div>
      <div className={classes.input_container}>
        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="pending">Pending</option>
          <option value="accepted">Accepted</option>
          <option value="declined">Declined</option>
        </select>
      </div>

      <button type="submit" className={classes.editform_submit_btn}>
        Save Changes
      </button>
    </form>
  );
}

export default EditJobForm;
