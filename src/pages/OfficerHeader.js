import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';


function OfficerHeader() {
    return (
        <Fragment>
            <nav>
                <div className="call-to-action">
                    <ul>
                        <li><Link to="/officer_dashboard" >Dashboard</Link></li>
                        <li><Link to="/officer_job_approval" >Job Approval</Link></li>
                        <li><Link to="/officer_chat" >Chat</Link></li>
                        <li><Link to="/officer_profile" >Profile</Link></li>
                        <li><Link to="/officer_contact" >Contact</Link></li>
                        <li><Link to="/logout" >Logout</Link></li>
                    </ul>
                </div>
            </nav>
        </Fragment >
    )
}

export default OfficerHeader;