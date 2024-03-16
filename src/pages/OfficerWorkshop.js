import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import OfficerHeader from './OfficerHeader';
import IndexFooter from './IndexFooter';


function Roles() {
    return (
        <Fragment>

            <header>
                <div className="header-container">
                    <h1>Workshops</h1>
                    <OfficerHeader />
                    <img src="assets/images/uta_logo.png" className="user-pic" alt=""></img>
                </div>
            </header>

            <main>
                {/* <!-- Roles Content --> */}
                <section id="goal">
                    <div className="tile-container">
                        <article className="style1">
                            <span className="image">
                                <img src="assets/images/uta_logo.png" alt="" />
                            </span>
                            <div className="overlay">

                                <div className="content">
                                    <p className="details">Total Workshops</p>
                                    <p className="details">150</p>
                                </div>
                            </div>
                        </article>


                        <article className="style1">
                            <span className="image">
                                <img src="assets/images/uta_logo.png" alt="" />
                            </span>
                            <div className="overlay">

                                <div className="content">
                                    <p className="details">Upcoming Workshops</p>
                                    <p className="details">4</p>
                                </div>
                            </div>
                        </article>
                        <article className="style1">
                            <span className="image">
                                <img src="assets/images/uta_logo.png" alt="" />
                            </span>
                            <div className="overlay">

                                <div className="content">
                                    <p className="details"><Link to="/officer_add_workshop">Add New Workshops</Link></p>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>

                <section id="jobsearch" className="tile">

                    {/* <!-- Job Applied Table --> */}
                    <div className="job-applied">
                        <table>
                            <thead>
                                <tr>
                                    <th>Date and Time</th>
                                    <th>Leader</th>
                                    <th>Location</th>
                                    <th>Topic</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>2023-08-15 10:00 AM</td>
                                    <td>John Doe</td>
                                    <td>Conference Room A</td>
                                    <td>Introduction to Diversity</td>
                                    <td>Upcoming</td>
                                </tr>
                                <tr>
                                    <td>2023-08-20 2:30 PM</td>
                                    <td>Jane Smith</td>
                                    <td>Training Hall B</td>
                                    <td>Women Emporment</td>
                                    <td>Upcoming</td>
                                </tr>
                                <tr>
                                    <td>2023-08-25 9:00 AM</td>
                                    <td>Mike Johnson</td>
                                    <td>Boardroom C</td>
                                    <td>underrepresented minority power</td>
                                    <td>Upcoming</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </section>
            </main>

            <IndexFooter />
        </Fragment >
    )
}

export default Roles;