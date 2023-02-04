import BarChartComponent from './BarChart';
import { useState, useEffect, Fragment } from 'react';
import AreaChartComponent from './AreaChart';
import Navbar from './Navbar';
import classes from './Stats.module.css';
import LoadingSpinner from '../UI/LoadingSpinner';

function Stats() {
  const [jobs, setJobs] = useState([]);
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
      setIsLoading(false);
      setJobs(data.jobs);
    }
    fetchData();
  }, []);
  return isLoading ? (
    <div className="centered">
      <LoadingSpinner></LoadingSpinner>
    </div>
  ) : (
    <Fragment>
      <Navbar></Navbar>
      <div className={classes.statsContainer}>
        <div className={classes.barChart}>
          <h2>Overall Job Status</h2>
          <h4>Bar Chart</h4>
          <BarChartComponent data={jobs}></BarChartComponent>
        </div>

        <div className={classes.areaChart}>
          <h2>Monthly Applications</h2>
          <h4>Area Chart</h4>
          <AreaChartComponent data={jobs}></AreaChartComponent>
        </div>
      </div>
    </Fragment>
  );
}
export default Stats;
