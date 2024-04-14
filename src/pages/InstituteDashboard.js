import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import InstituteHeader from './InstituteHeader';
import IndexFooter from './IndexFooter';
import BarChart from '../charts/BarChart';
import { OfficerDashboardData } from './OfficerDashboardData';
import axios from 'axios';
function InstituteDashboard() {
	const userID = window.localStorage.getItem("userId");
	const [officerDashboardData, setOfficerDashboardData] = useState({
		labels: OfficerDashboardData.map((data) => data.Race),
		datasets: [{
			label: "Students",
			data: OfficerDashboardData.map((data) => data.Candidates),

		}]
	})
	const [postedjobs, setPostedjobs] = useState([]);
    useEffect(() => {
        axios.post('http://localhost/job_fetch_institute.php', { userId: userID })
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
					<InstituteHeader />
				</div>
			</header>

			<main>
				{/* <!-- Dahsboard Content --> */}
				<section id="dashboard">
					<div className="row">
						<article className="style1">
							<div className="graph-container">
								<div className="graph-info">
									<h1><Link to="/institute_jobposted" style={{ color: 'black' }}>Jobs Posted</Link></h1>
									<ul>
                                        {postedjobs.slice(0,5).map((job) => (
                                            <li key={job.positionID}>
												<p style={{ color: 'black', textDecoration: 'none' }}>{job.title}</p>
												<p style={{ color: 'black', textDecoration: 'none' }}>{job.fieldOfStudy}</p>
											</li>
                                        ))}
                                    </ul>
								</div>
								
							</div>
						</article>

						<article className="style1">
							<div className="graph-container">
								<div className="graph-info">
									<h1><Link to="/institute_application_status" style={{ color: 'black' }}>Applications</Link></h1>
								</div>
							</div>
						</article>
						
					</div>
				</section>
			</main>

			<IndexFooter />
		</Fragment>
	)

}

export default InstituteDashboard;

