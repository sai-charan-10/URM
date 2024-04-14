import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom'; // Import useParams to access URL parameters
import InstituteHeader from './InstituteHeader';
import IndexFooter from './IndexFooter';
import axios from 'axios';

function JobDetails() {
    // State to store job details and loading state
    const [jobDetails, setJobDetails] = useState([]);
    
    // Get the job ID from URL parameters
    const { jobId } = useParams();
    
    // Fetch job details from the API
    useEffect(() => {
        axios.post('http://localhost/job_fetch_by_Id.php', { id: jobId })
            .then((response) => {
                if (response.data.status === 'success') {
                    setJobDetails(response.data.details);
                } else {
                    console.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, []);


    // Render job details
    return (
        <Fragment>
            <header>
                <div className="header-container">
                    <h1>Details</h1>
                    <InstituteHeader />
                    <img src="assets/images/uta_logo.png" className="user-pic" alt=""></img>
                </div>
            </header>
            <main>
                <div>
                    {jobDetails.map((job) => (
                        <div key={job.positionID}>
                            <h1>{job.title}</h1>
                            <p>Description: {job.description}</p>
                            <p>Field: {job.fieldOfStudy}</p>
                            <p>Location: {job.location}</p>
                            <p>Salary: {job.salary}</p>
                        </div>
                    ))}
                </div>
            </main>
            
            <IndexFooter />
        </Fragment>
    );
}

export default JobDetails;
