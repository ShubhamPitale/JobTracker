import React, { useState, useEffect, Fragment } from 'react';
import CreateJobForm from './CreateJobForm';
import EditJobForm from './EditJobForm';
import ReactModal from 'react-modal';
import classes from './Jobs.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons';
import nodata from '../images/nodata.png';

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingJobModal, setEditingJobModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/v1/jobs/', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data.jobs);
      setJobs(data.jobs);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const handleAddJob = () => {
    setShowModal(!showModal);
  };

  const handleEditModal = () => {
    setEditingJobModal(!editingJobModal);
  };

  const handleEdit = (job) => {
    setEditingJob(job);
    handleEditModal();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseEditModal = () => {
    setEditingJobModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job?')) {
      const token = localStorage.getItem('token');
      fetch(`/api/v1/jobs/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Success:', data);
          setJobs(jobs.filter((job) => job.id !== id)); // Update the list of jobs
        })
        .catch((error) => {
          console.error('Error:', error);
        });
      window.location.reload();
    }
  };

  return isLoading ? (
    <div className="centered">
      <LoadingSpinner></LoadingSpinner>
    </div>
  ) : (
    <Fragment>
      <div className={classes.main_container}>
        <button
          type="button"
          onClick={handleAddJob}
          className={classes.addjob_btn}
        >
          Add Job
        </button>
        {jobs.length == 0 ? (
          <div className={classes.img_container}>
            <img src={nodata}></img>
          </div>
        ) : (
          <div className={classes.jobs}>
            {jobs.map((job) => (
              <div key={job._id} className={classes.job}>
                <div className={classes.job_head}>
                  <h2>{job.position}</h2>
                  <p>{job.company}</p>
                </div>
                <div className={classes.job_details}>
                  <p className={classes.status} data-status={job.status}>
                    {job.status}
                  </p>
                  <p>
                    <FontAwesomeIcon
                      icon={faCalendarDays}
                      className={classes.calIcon}
                    ></FontAwesomeIcon>
                    {job.updatedAt.substring(0, 10)}
                  </p>
                </div>

                <div className={classes.job_actions}>
                  <button
                    type="button"
                    onClick={() => handleDelete(job._id)}
                    className={classes.delete_job_btn}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    onClick={() => handleEdit(job)}
                    className={classes.edit_job_btn}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ReactModal
        isOpen={showModal}
        onRequestClose={handleCloseModal}
        className={classes.modal}
        overlayClassName={classes.overlay}
        shouldCloseOnOverlayClick={true}
      >
        <button onClick={handleAddJob} className={classes.modal_close_btn}>
          <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
        </button>
        <CreateJobForm />
      </ReactModal>
      <ReactModal
        isOpen={editingJobModal}
        onRequestClose={handleCloseEditModal}
        shouldCloseOnOverlayClick={true}
        className={classes.modal}
        overlayClassName={classes.overlay}
      >
        <button onClick={handleEditModal} className={classes.modal_close_btn}>
          <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
        </button>
        <EditJobForm job={editingJob} />
      </ReactModal>
    </Fragment>
  );
}

export default Jobs;
