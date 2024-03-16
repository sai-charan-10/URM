import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import InstituteHeader from './InstituteHeader';
import IndexFooter from './IndexFooter';
import BarChart from '../charts/BarChart';
import { OfficerDashboardData } from './OfficerDashboardData';

function InstituteDashboard() {

	const [officerDashboardData, setOfficerDashboardData] = useState({
		labels: OfficerDashboardData.map((data) => data.Race),
		datasets: [{
			label: "Students",
			data: OfficerDashboardData.map((data) => data.Candidates),

		}]
	})


	return (
		<Fragment>
			<header>
				<div className="header-container">
					<h1>Institute Dashboard</h1>
					<InstituteHeader />
					<img src="assets/images/uta_logo.png" className="user-pic" alt=""></img>
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
								</div>
								
							</div>
						</article>

						<article className="style1">
							<div className="graph-container">
								<div className="graph-info">
									<h1><Link to="/institute_application_status" style={{ color: 'black' }}>Application Status</Link></h1>
								</div>
							</div>
						</article>

						<article className="style1">
							<div className="graph-container">
								<div className="graph-info">
									<h1><Link to="/institute_candidates_interested" style={{ color: 'black' }}>Candidates Interested</Link></h1>
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

