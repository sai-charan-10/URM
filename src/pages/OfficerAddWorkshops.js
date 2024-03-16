import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import OfficerHeader from './OfficerHeader';
import IndexFooter from './IndexFooter';

function OfficerAddWorkshops() {
    return (
        <Fragment>
            <header>
                <div className="header-container">
                    <h1>New Workshop Details</h1>
                    <OfficerHeader />
                    <img src="assets/images/uta_logo.png" className="user-pic" alt=""></img>
                </div>
            </header>

            <main>
                <section id="profile" className="tile">
                    <form action="candidate_profile.php" method="POST">


                        <label for="date">Date</label>
                        <input type="date" id="date" name="date" required />

                        <label for="time">Time</label>
                        <input type="time" id="time" name="time" required />

                        <label for="lead-name">Lead Name</label>
                        <input type="text" id="lead-name" name="lead-name" required />

                        <label for="location">Location</label>
                        <input type="text" id="location" name="location" required />

                        <label for="topic">Topic</label>
                        <input type="text" id="topic" name="topic" required />

                        <div className="profile-actions">
                            <button type="submit">Submit</button>
                        </div>

                    </form>
                </section>

            </main>

            <IndexFooter />
        </Fragment>
    )

}

export default OfficerAddWorkshops;
