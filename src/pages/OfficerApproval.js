import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import OfficerHeader from './OfficerHeader';
import IndexFooter from './IndexFooter';
import axios from 'axios';

function OfficerApproval() {

    const userID = window.localStorage.getItem("userId");


    // State to store the job data received from the API
    const [jobs, setJobs] = useState([]);

    const handlefetchJob = (event) => {
        event.preventDefault();

        // Call the API to fetch the job data
        axios.get('E:/Web_Data_Management/Project_Code/wdm_project/backend/job_fetch.php')
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

    //handle Apply
    const handleApproval = (jobID, userID) => {
        // Call the API to apply for the job with the given jobID and userID

        const data = {
            jobId: jobID,
            userId: userID,
        };

        axios
            .post('E:/Web_Data_Management/Project_Code/wdm_project/backend/job_approval.php', data)
            .then((response) => {
                if (response.data.status === 'success') {
                    // Job applied successfully, update the jobs state or show a success message
                    alert('Job Approved Successfully');
                } else {
                    // Handle the case where no job data is found or there's an error
                    console.error(response.data.message);
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
                    <h1>Jobs Approval</h1>
                    <OfficerHeader />
                    <img src="assets/images/uta_logo.png" className="user-pic" alt=""></img>
                </div>
            </header>

            <main>
                {/* <!-- Jobs Applied Content --> */}
                <section id="jobsearch" className="tile">
                    <div className="search">
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
                                    <th>Deadline</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job.JobID}>
                                        <td>{job.Title}</td>
                                        <td>{job.Field_Of_Study}</td>
                                        <td>{job.Description}</td>
                                        <td>{job.Location}</td>
                                        <td>{job.Qualification}</td>
                                        <td>{job.Salary}</td>
                                        <td>{job.EndDate}</td>
                                        <td>{job.Status}</td>
                                        <td>
                                            <div className="job-actions">
                                                <button type="button" onClick={() => handleApproval(job.JobID, userID)}>Approve</button>
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
    )

}

export default OfficerApproval;
