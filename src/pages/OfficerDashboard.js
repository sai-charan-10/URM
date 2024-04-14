import React, { Fragment, useState, useEffect } from 'react';
import OfficerHeader from './OfficerHeader';
import IndexFooter from './IndexFooter';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function OfficerDashboard() {

	const userID = window.localStorage.getItem("userId");
	let history = useNavigate();

	// State to store the job data received from the API
	const [jobs, setJobs] = useState([]);

	useEffect(() => {

		// Call the API to fetch the job data
		axios.post('http://localhost/officer_application_fetch.php', { userId:userID })
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
	console.log(jobs);
	//handle Apply
	const handleApproval = (jobID, candidateID, instituteID) => {
		// Call the API to apply for the job with the given jobID and userID

		const data = {
			jobId: jobID,
			candidateId: candidateID,
			instituteId: instituteID,
		};

		axios.post('http://localhost/job_approval.php', data)
			.then((response) => {
				if (response.data.status === 'success') {
					// Job applied successfully, update the jobs state or show a success message
					alert('Recruited');
					setJobs(prevJobs => prevJobs.filter(job => job.positionID !== jobID));
				} else {
					// Handle the case where no job data is found or there's an error
					console.error(response.data.message);
				}
			})
			.catch((error) => {
				console.error('Error:', error);
			});
		axios.post('http://localhost/application_delete.php', data)
			.then((response) => {
				if (response.data.status === 'success') {
					history('/officer_dashboard');
				} else {
					// Handle the case where no job data is found or there's an error
					console.error(response.data.message);
				}
			});
	};
	return (
		<Fragment>
			<header>
				<div className="header-container">
					<h1>Dashboard</h1>
					<OfficerHeader />
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
                                    <th>Job Name</th>
                                    <th>Department</th>
                                    <th>Job Description</th>
                                    <th>Qualification</th>
									<th>Candidate</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {jobs.map((job) => (
                                    <tr key={job.positionID}>
                                        <td>{job.title}</td>
                                        <td>{job.fieldOfStudy}</td>
                                        <td>{job.description}</td>
                                        <td>{job.qualification}</td>
										<td>{job.name}</td>
                                        <td>
                                            <div className="job-actions">
                                                <button type="button" onClick={() => handleApproval(job.positionID, job.candidateID, job.institutionID)}>Approve</button>
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

export default OfficerDashboard;

