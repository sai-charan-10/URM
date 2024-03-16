import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InstituteHeader from './InstituteHeader';
import IndexFooter from './IndexFooter';
import axios from 'axios';

function InstituteJobPosted() {
    let history = useNavigate();

    // State to store the job data received from the API
    const [jobs, setJobs] = useState([]);

    // Function to fetch the job data when the component mounts
    /*useEffect(() => {
        // Fetch job data from the PHP script using Axios
        axios.get('http://localhost/job_action.php')
            .then((response) => {
                // Check if the response status is 'success' and update the jobs state
                if (response.data.status === 'success') {
                    setJobs(response.data.jobs);
                } else {
                    // Handle the case where no job data is found or there's an error
                    console.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);*/

    const handleAdd = (event) => {
        event.preventDefault();
        history('/institute_add_job');
    };

    const handlefetchJob = (event) => {
        event.preventDefault();

        // Call the API to fetch the job data
        axios.get('http://localhost/job_fetch.php')
            .then((response) => {
                if (response.data.status === 'success') {
                    // Job data fetched successfully, update the jobs state
                    setJobs(response.data.jobs);
                } else {
                    // Handle the case where no job data is found or there's an error
                    console.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const handleDelete = (jobID) => {
        // Call the API to delete the job with the given jobID
        axios.post('http://localhost/job_delete.php', { jobID })
            .then((response) => {
                if (response.data.status === 'success') {
                    // Job deleted successfully, update the jobs state by removing the deleted job
                    setJobs((prevJobs) => prevJobs.filter((position) => position.positionID !== jobID));
                } else {
                    // Handle the case where the job deletion failed or there's an error
                    console.error(response.data.message);
                    
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    // Function to navigate to the page for modifying job details
    const handleModify = (jobID) => {
        history(`/institute_edit_job?jobID=${jobID}`);
    };

    return (
        <Fragment>
            <header>
                <div className="header-container">
                    <h1>Job Posted</h1>
                    <InstituteHeader />
                    <img src="assets/images/uta_logo.png" className="user-pic" alt=""></img>
                </div>
            </header>

            <main>
                {/* <!-- Jobs Applied Content --> */}
                <section id="jobsearch" className="tile">
                    <div className="search">
                        <input type="submit" value="Add Job" className="cta-button" onClick={handleAdd} />
                        <input type="submit" value="Fetch Job" className="cta-button" onClick={handlefetchJob} />
                    </div>

                    {/* <!-- Job Applied Table --> */}
                    <div className="job-applied">
                        <table>
                            <thead>
                                <tr>
                                    <th>Job Name</th>
                                    <th>Department</th>
                                    <th>Job Description</th>
                                    <th>Location</th>
                                    <th>Qualifications</th>
                                    <th>Salary</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job.positionID}>
                                        <td>{job.title}</td>
                                        <td>{job.fieldOfStudy}</td>
                                        <td>{job.description}</td>
                                        <td>{job.location}</td>
                                        <td>{job.qualification}</td>
                                        <td>{job.salary}</td>
                                        <td>
                                            <div className="job-actions">
                                                <button type="button" onClick={() => handleModify(job.positionID)}>Modify</button>
                                                <button type="button" onClick={() => handleDelete(job.positionID)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            <IndexFooter />
        </Fragment>
    );
}

export default InstituteJobPosted;
