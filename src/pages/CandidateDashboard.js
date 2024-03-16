import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import CandidateHeader from './CandidateHeader';
import IndexFooter from './IndexFooter';
import BarChart from '../charts/BarChart';
import { OfficerDashboardData } from './OfficerDashboardData';


function CandidateDashboard() {

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
                    <h1>Candidate Dashboard</h1>
                    <CandidateHeader />
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
                                    <h1><Link to="/candidate_jobsearch" style={{ color: 'black' }}>Jobs Posted</Link></h1>
                                </div>
                                
                            </div>
                        </article>
                        <article className="style1">
                            <div className="graph-container">
                                <div className="graph-info">
                                    <h1><Link to="/candidate_jobapplied" style={{ color: 'black' }}>Jobs Applied</Link></h1>
                                </div>
                                
                            </div>
                        </article>
                    </div>
                    <div className="row">
                        <article className="style1">
                            <div className="graph-container">
                                <div className="graph-info">
                                    <h1><Link to="/candidate_jobsaved" style={{ color: 'black' }}>Jobs Saved</Link></h1>
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