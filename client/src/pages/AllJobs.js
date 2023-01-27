import { Fragment } from 'react';
import Jobs from '../components/Jobs';
import Navbar from '../components/Navbar';

const AllJobs = () => {
  return (
    <Fragment>
      <Navbar></Navbar>
      <Jobs></Jobs>
    </Fragment>
  );
};
export default AllJobs;
