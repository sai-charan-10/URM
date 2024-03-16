import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import OfficerHeader from './OfficerHeader';
import IndexFooter from './IndexFooter';

function OfficerRecruiter() {
    return (
        <Fragment>
            <header>
                <div className="header-container">
                    <h1>Recruiter Information</h1>
                    <OfficerHeader />
                    <img src="assets/images/uta_logo.png" className="user-pic" alt=""></img>
                </div>
            </header>

            <main>
                {/* <!-- Jobs Applied Content --> */}
                <section id="jobsearch" className="tile">
                    <div className="search">
                        <input type="text" placeholder="Search by name, field of study, or institution" />
                        <button>Search</button>
                    </div>

                    {/* <!-- Job Applied Table --> */}
                    <div className="job-applied">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>First_Name</th>
                                    <th>Last_Name</th>
                                    <th>College</th>
                                    <th>D.O.B</th>
                                    <th>Email</th>
                                    <th>Profile</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Karthikeya</td>
                                    <td>Janjanam</td>
                                    <td>UTA</td>
                                    <td>04-27-2001</td>
                                    <td>karthikeya.janjanam56789@gmail.com</td>
                                    <td><a href="recruiter_profile.html">View Profile</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            <IndexFooter />
        </Fragment>
    )

}

export default OfficerRecruiter;
