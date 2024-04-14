import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InstituteHeader from './InstituteHeader';
import IndexFooter from './IndexFooter';
import axios from 'axios';


function InstituteApplicationStatus() {

    const userID = window.localStorage.getItem("userId");


    // State to store the job data received from the API
    const [jobs, setJobs] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const savedJobsResponse = await axios.post('http://localhost/application_recruiter_fetch.php', { userId: userID });
                if (savedJobsResponse.data.status === 'success') {
                    const savedJobs = savedJobsResponse.data.jobs;
    
                    // Extract job IDs
                    const jobIDs = savedJobs.map(job => job.positionID);
    
                    // Fetch job names and descriptions
                    const jobNamesResponse = await axios.post('http://localhost/job_name_fetch.php', { jobIDs });
                    if (jobNamesResponse.data.status === 'success') {
                        const updatedJobs = savedJobs.map(job => {
                            const updatedJob = jobNamesResponse.data.jobs.find(updatedJob => updatedJob.positionID === job.positionID);
                            if (updatedJob) {
                                return { ...job, title: updatedJob.title, description: updatedJob.description };
                            }
                            return job;
                        });
                        const candidateIDs = updatedJobs.map(job => job.candidateID);
                        const candidateNamesResponse = await axios.post('http://localhost/get_candidate.php', { candidateIDs });
                        if (candidateNamesResponse.data.status === 'success') {
                            const newupdatedJobs = updatedJobs.map(job => {
                                const newupdatedJob = candidateNamesResponse.data.candidates.find(newupdatedJob => newupdatedJob.candidateID === job.candidateID);
                                if (newupdatedJob) {
                                    return { ...job, name: newupdatedJob.name , fieldOfStudy: newupdatedJob.fieldOfStudy, education:newupdatedJob.education};
                                }
                                return job;
                            });
                        // Update the state with updated jobs
                            setJobs(newupdatedJobs);
                        } else {
                            console.error(jobNamesResponse.data.message);
                        }
                    } else {
                        console.error(jobNamesResponse.data.message);
                    }
                } else {
                    console.error(savedJobsResponse.data.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        fetchData();
    }, []);


    return (
        <Fragment>

            <header>
                <div className="header-container">
                    <h1>Applications</h1>
                    <InstituteHeader />
                    <img src="assets/images/uta_logo.png" className="user-pic" alt=""></img>
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
                                    <th>Title</th>
                                    <th>Candidate</th>
                                    <th>Field</th>
                                    <th>Education</th>
                                    <th>Date Applied</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job.applicationID}>
                                        <td><Link to={`/job_details/${job.positionID}`}>{job.title}</Link></td>
                                        <td><Link to={`/candidate_details/${job.candidateID}`}>{job.name}</Link></td>
                                        <td>{job.fieldOfStudy}</td>
                                        <td>{job.education}</td>
                                        <td>{job.dateApplied}</td>
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

export default InstituteApplicationStatus;