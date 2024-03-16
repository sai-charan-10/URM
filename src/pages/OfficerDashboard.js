import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import OfficerHeader from './OfficerHeader';
import IndexFooter from './IndexFooter';
import BarChart from '../charts/BarChart';
import { OfficerDashboardData } from './OfficerDashboardData';

function OfficerDashboard() {

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
					<h1>Officer Dashboard</h1>
					<OfficerHeader />
					<img src="assets/images/uta_logo.png" className="user-pic" alt=""></img>
				</div>
			</header>

			<main>
				{/* <!--Begin Diversity Matrics Content--> */}

				{/* <!-- Dahsboard Content --> */}
				<section id="dashboard">
					<h1>Diversity Metrics</h1>
					<div className="row">
						<article className="style1">
							<div className="graph-container">
								<div className="graph-info">
									<h1><Link to="/officer_jobmatched" style={{ color: 'black' }}>Jobs Matched under DEI criteria</Link></h1>
									<span className="count">150</span>
								</div>
								<div className="graph">
									<BarChart chartData={officerDashboardData} />
								</div>
							</div>
						</article>
						<article className="style1">
							<div className="graph-container">
								<div className="graph-info">
									<h1><Link to="/officer_candidates" style={{ color: 'black' }}>Interested Candidates</Link></h1>
									<span className="count">15</span>
								</div>
								<div className="graph">
									<BarChart chartData={officerDashboardData} />
								</div>
							</div>
						</article>
						<article className="style1">
							<div className="graph-container">
								<div className="graph-info">
									<h1><Link to="/officer_recruiter" style={{ color: 'black' }}>Total Number of Recruiters</Link></h1>
									<span className="count">35</span>
								</div>
								<div className="graph">
									<BarChart chartData={officerDashboardData} />
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

export default OfficerDashboard;

