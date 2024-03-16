import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

function Index() {
    return (
        <Fragment>
            <nav>
                <div className="call-to-action">
                    <ul>
                        <li><Link to="/" >Home</Link></li>
                        <li><Link to="/login" >Login</Link></li>
                        <li><Link to="/register" >Register</Link></li>
                        <li><Link to="/blog" >Blog</Link></li>
                        <li><Link to="/contact" >Contact</Link></li>
                    </ul>
                </div>
            </nav>
        </Fragment >
    )
}

export default Index;