import React, { Fragment, useState, useEffect } from 'react';
import { useLocation, useParams, useHistory, useNavigate } from 'react-router-dom';
import InstituteHeader from './InstituteHeader';
import IndexFooter from './IndexFooter';
import axios from 'axios';

function InstituteEditJob() {
  // State to store the job data
  let history = useNavigate();
  const [jobData, setJobData] = useState({
    title: '',
    fieldOfStudy: '',
    description: '',
    location: '',
    qualification: '',
    salary: ''
  });

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const jobID = searchParams.get('jobID');
  // Get the job ID from the URL parameter
 
  // Function to fetch the job data when the component mounts
  useEffect(() => {
    // Fetch job data from the PHP script using Axios
    axios
      .get(`http://localhost/job_fetch_by_Id.php?id=${jobID}`)
      .then((response) => {
        // Check if the response status is 'success' and update the jobData state
        console.log('Full Response:', response);
        if (response.data) {
          setJobData(response.data);
        } else {
          // Handle the case where no job data is found or there's an error
          //console.error(response.data.message);
          console.error('No job data found or an error occurred.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [jobID]);

  // Function to handle input changes
  const handleInput = (event) => {
    setJobData({ ...jobData, [event.target.name]: event.target.value });
  };

  // Function to handle form submission for updating the job
  const handleSubmit = (event) => {
    event.preventDefault();

    // Call the API to update the job data
    axios
      .post(`http://localhost/job_update.php`, { ...jobData, id: jobID })
      .then((response) => {
        if (response.data.status === 'success') {
          // Job data updated successfully
          alert('Job data updated:', response.data.job);
          history('/institute_jobposted')
          // You can choose to navigate to a different page or show a success message here
        } else {
          // Job data update failed
          console.error(response.data.message);
          // You can choose to show an error message here
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <Fragment>
      <header>
        <div className="header-container">
          <h1>Edit Job</h1>
          <InstituteHeader />
          <img src="assets/images/uta_logo.png" className="user-pic" alt="" />
        </div>
      </header>

      <main>
        <form action="" onSubmit={handleSubmit}>
          <label htmlFor="job_name">Title:</label>
          <input
            type="text"
            id="job_name"
            name="job_name"
            placeholder="Enter job name"
            onChange={handleInput}
            value={jobData.title}
            required
          />

          <label htmlFor="department">Department:</label>
          <select
            id="department"
            name="department"
            onChange={handleInput}
            required
            value={jobData.fieldOfStudy}
          >
            <option value="">Select Department type</option>
            <option value="engineering">Engineering</option>
            <option value="business">Business</option>
            <option value="literature">Literature</option>
          </select>

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter description"
            onChange={handleInput}
            value={jobData.description}
            required
          />

          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location"
            onChange={handleInput}
            value={jobData.location}
            required
          />

          <label htmlFor="qualification">Required Qualification:</label>
          <select
            id="qualification"
            name="qualification"
            onChange={handleInput}
            required
            value={jobData.qualification}
          >
            <option value="">Select minimum qualification</option>
            <option value="bs">BS</option>
            <option value="ms">MS</option>
            <option value="phd">PHD</option>
          </select>

          <label htmlFor="salary">Salary:</label>
          <input
            type="text"
            id="salary"
            name="salary"
            placeholder="Enter salary"
            onChange={handleInput}
            value={jobData.salary}
            required
          />

          <input type="submit" value="Update" className="cta-button" />
        </form>
      </main>

      <IndexFooter />
    </Fragment>
  );
}

export default InstituteEditJob;
