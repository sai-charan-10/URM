import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CandidateHeader from './CandidateHeader';
import IndexFooter from './IndexFooter';
import axios from 'axios';


function CandidateJobSaved() {

    const userID = window.localStorage.getItem("userId");


    // State to store the job data received from the API
    const [jobs, setJobs] = useState([]);

    useEffect(() => {

        const data = {
            userId: userID,
        };

        // Call the API to fetch the job data
        axios.post('http://localhost/application_saved_fetch.php', data)
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
    }, []);
    //handle Apply
    const handleApply = (jobID, userID) => {
        // Call the API to apply for the job with the given jobID and userID

        const data = {
            jobId: jobID,
            userId: userID,
        };

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

    return (
        <Fragment>

            <header>
                <div className="header-container">
                    <h1>Jobs Saved</h1>
                    <CandidateHeader />
                </div>
            </header>

            <main>
                {/* <!-- Jobs Applied Content --> */}
                <section id="jobsearch" className="tile">

                    {/* <!-- Job Applied Table --> */}
                    <div className="job-applied">
                        <table>
                            <thead>
                                <tr>
                                    <th>Job Title</th>
                                    <th>Institute</th>
                                    <th>Description</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job.positionID}>
                                        <td>{job.title}</td>
                                        <td>{job.name}</td>
                                        <td>{job.description}</td>
                                        <td>{job.status}</td>
                                        <td>
                                            <div className="job-actions">
                                                <button type="button" onClick={() => handleApply(job.JobID, userID)}>Apply</button>
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

export default CandidateJobSaved;