import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CandidateHeader from './CandidateHeader';
import IndexFooter from './IndexFooter';
import BarChart from '../charts/BarChart';
import { OfficerDashboardData } from './OfficerDashboardData';
import axios from 'axios';

function CandidateDashboard() {
    const userID = window.localStorage.getItem("userId");
    const [officerDashboardData, setOfficerDashboardData] = useState({
        labels: OfficerDashboardData.map((data) => data.Race),
        datasets: [{
            label: "Students",
            data: OfficerDashboardData.map((data) => data.Candidates),

        }]
    })
    
    const [savedjobs, setSavedjobs] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const savedJobsResponse = await axios.post('http://localhost/application_saved_fetch.php', { userId: userID });
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
    
                        // Update the state with updated jobs
                        setSavedjobs(updatedJobs);
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
    const [appliedjobs, setAppliedjobs] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const appliedJobsResponse = await axios.post('http://localhost/application_fetch.php', { userId: userID });
                if (appliedJobsResponse.data.status === 'success') {
                    const appliedJobs = appliedJobsResponse.data.jobs;
    
                    // Extract job IDs
                    const jobIDs = appliedJobs.map(job => job.positionID);
    
                    // Fetch job names and descriptions
                    const jobNamesResponse = await axios.post('http://localhost/job_name_fetch.php', { jobIDs });
                    if (jobNamesResponse.data.status === 'success') {
                        const updatedJobs = appliedJobs.map(job => {
                            const updatedJob = jobNamesResponse.data.jobs.find(updatedJob => updatedJob.positionID === job.positionID);
                            if (updatedJob) {
                                return { ...job, title: updatedJob.title, description: updatedJob.description };
                            }
                            return job;
                        });
    
                        // Update the state with updated jobs
                        setAppliedjobs(updatedJobs);
                    } else {
                        console.error(jobNamesResponse.data.message);
                    }
                } else {
                    console.error(appliedJobsResponse.data.message);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
    
        fetchData();
    }, []);
    const [postedjobs, setPostedjobs] = useState([]);
    useEffect(() => {
        axios.get('http://localhost/job_fetch.php')
            .then((response) => {
                if (response.data.status === 'success') {
                    // Job data fetched successfully, update the jobs state
                    setPostedjobs(response.data.jobs);
                } else {
                    // Handle the case where no job data is found or there's an error
                    console.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);
    
    return (
        <Fragment>

            <header>
                <div className="header-container">
                    <h1>Dashboard</h1>
                    <CandidateHeader />
                </div>
            </header>

            <main>
                {/* <!-- Dahsboard Content --> */}
                <section id="dashboard">
                    <div className="row">
                        <article className="style1">
                            <div className="graph-container">
                                <div className="graph-info">
                                    <h1><Link to="/candidate_jobsearch" style={{ color: 'black' }}>Jobs Posted</Link></h1>
                                    <ul>
                                        {postedjobs.slice(0,5).map((job) => (
                                            <li key={job.positionID}>{job.title}</li>
                                        ))}
                                    </ul>
                                </div>
                                
                            </div>
                        </article>
                        <article className="style1">
                            <div className="graph-container">
                                <div className="graph-info">
                                    <h1><Link to="/candidate_jobapplied" style={{ color: 'black' }}>Jobs Applied</Link></h1>
                                    <ul>
                                        {appliedjobs.slice(0,5).map((job) => (
                                            <li key={job.applicationID}>{job.title}</li>
                                        ))}
                                    </ul>
                                </div>
                                
                            </div>
                        </article>
                    </div>
                    <div className="row">
                        <article className="style1">
                            <div className="graph-container">
                                <div className="graph-info">
                                    <h1><Link to="/candidate_jobsaved" style={{ color: 'black' }}>Jobs Saved</Link></h1>
                                    <ul>
                                        {savedjobs.slice(0,5).map((job) => (
                                            <li key={job.applicationID}>{job.title}</li>
                                        ))}
                                    </ul>
                                </div>
                                
                            </div>
                        </article>
                    </div>
                </section>
            </main>

            <IndexFooter />
        </Fragment >
    )
}

export default CandidateDashboard;