import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CandidateHeader from './CandidateHeader';
import IndexFooter from './IndexFooter';
import axios from 'axios';


function CandidateJobSearch() {


    const userID = window.localStorage.getItem("userId");


    // State to store the job data received from the API
    const [jobs, setJobs] = useState([]);

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

    //handle Apply
    const handleApply = (jobID, userID) => {
        // Call the API to apply for the job with the given jobID and userID

        const data = {
            jobId: jobID,
            userId: userID,
        };
        console.log(data)

        axios
            .post('http://localhost/job_apply.php', data)
            .then((response) => {
                if (response.data.status === 'success') {
                    // Job applied successfully, update the jobs state or show a success message
                    alert('Job Applied Successfully');
                } else {
                    // Handle the case where no job data is found or there's an error
                    console.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };


    //handle save
    const handleSave = (jobID, userID) => {
        // Call the API to delete the job with the given jobID
        const data = {
            jobId: jobID,
            userId: userID,
        };

        axios.post('http://localhost/job_save.php', data)
            .then((response) => {
                if (response.data.status === 'success') {
                    // Job deleted successfully, update the jobs state by removing the deleted job
                    alert("Job Saved Successfully");
                } else {
                    // Handle the case where no job data is found or there's an error
                    console.error(response.data.message);
                }

            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    return (
        <Fragment>

            <header>
                <div className="header-container">
                    <h1>Candidate Job Search</h1>
                    <CandidateHeader />
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
                                    <th>Job ID</th>
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
                                        <td>{job.positionID}</td>
                                        <td>{job.title}</td>
                                        <td>{job.fieldOfStudy}</td>
                                        <td>{job.description}</td>
                                        <td>{job.location}</td>
                                        <td>{job.qualification}</td>
                                        <td>{job.salary}</td>
                                        <td>
                                            <div className="job-actions">
                                                <button type="button" onClick={() => handleApply(job.positionID, userID)}>Apply</button>
                                                <button type="button" onClick={() => handleSave(job.positionID, userID)}>Save</button>
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
        </Fragment >
    )
}

export default CandidateJobSearch;