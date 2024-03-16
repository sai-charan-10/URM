
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import OfficerHeader from './OfficerHeader';
import IndexFooter from './IndexFooter';


function OfficerCandidates() {
    return (
        <Fragment>
            <header>
                <div className="header-container">
                    <h1>Candidates</h1>
                    <OfficerHeader />
                    <img src="assets/images/uta_logo.png" className="user-pic" alt=""></img>
                </div>
            </header>

            <main>
                {/* <!-- Jobs Applied Content --> */}
                <section id="jobsearch" class="tile">
                    <div class="search">
                        <input type="text" placeholder="Search by name, field of study, or institution" />
                        <button>Search</button>
                    </div>

                    {/* <!-- Job Applied Table --> */}
                    <div class="job-applied">
                        <table>
                            <thead>
                                <tr>
                                    <th>S.no</th>
                                    <th>First_Name</th>
                                    <th>Last_Name</th>
                                    <th>Education</th>
                                    <th>D.O.B</th>
                                    <th>Email</th>
                                    <th>Profile</th>
                                    <th>Ethnicity</th>
                                    <th>Current Status</th>
                                    <th>Location</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Karthikeya</td>
                                    <td>Janjanam</td>
                                    <td>Masters</td>
                                    <td>04-27-2001</td>
                                    <td>karthikeya.janjanam56789@gmail.com</td>
                                    <td><Link to="/candidate_profile">View Profile</Link></td>
                                    <td>Asian</td>
                                    <td>Under HR review</td>
                                    <td>Arlington, TX</td>
                                </tr>

                                <tr>
                                    <td>2</td>
                                    <td>Jayasurya</td>
                                    <td>Guna</td>
                                    <td>Masters</td>
                                    <td>04-27-2001</td>
                                    <td>jaya.guna@gmail.com</td>
                                    <td><Link to="/candidate_profile">View Profile</Link></td>
                                    <td>White</td>
                                    <td>Under HR review</td>
                                    <td>Dallas, TX</td>
                                </tr>

                                <tr>
                                    <td>3</td>
                                    <td>John</td>
                                    <td>Doe</td>
                                    <td>Bachelor's</td>
                                    <td>09-15-1995</td>
                                    <td>john.doe@example.com</td>
                                    <td><Link to="/candidate_profile">View Profile</Link></td>
                                    <td>Black</td>
                                    <td>Background Check Pending</td>
                                    <td>San Francisco, CA</td>
                                </tr>

                                <tr>
                                    <td>4</td>
                                    <td>Jane</td>
                                    <td>Smith</td>
                                    <td>PhD</td>
                                    <td>05-03-1988</td>
                                    <td>jane.smith@example.com</td>
                                    <td><Link to="/candidate_profile">View Profile</Link></td>
                                    <td>Hispanic</td>
                                    <td>Background Check Pending</td>
                                    <td>Los Angeles, CA</td>
                                </tr>

                                <tr>
                                    <td>5</td>
                                    <td>Michael</td>
                                    <td>Johnson</td>
                                    <td>Bachelor's</td>
                                    <td>11-21-1990</td>
                                    <td>michael.johnson@example.com</td>
                                    <td><Link to="/candidate_profile">View Profile</Link></td>
                                    <td>Asian</td>
                                    <td>Under HR review</td>
                                    <td>New York, NY</td>
                                </tr>

                                {/* <!-- Add more rows as needed --> */}
                            </tbody>
                        </table>


                    </div>
                </section>
            </main>

            <IndexFooter />
        </Fragment>
    )
}

export default OfficerCandidates;
