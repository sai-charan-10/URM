import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import IndexHeader from './IndexHeader';
import IndexFooter from './IndexFooter';

function Index() {
    return (
        <Fragment>
            <header>
                <div className="header-container">
                    <h1>URM Application</h1>
                    <IndexHeader />
                    <img src="assets/images/uta_logo.png" className="user-pic" alt=""></img>
                </div>
            </header>
            <main>
                {/* <!-- Homepage Content --> */}
                <section id="homepage">
                    <h2>About</h2>
                    <p>The URM Application project aims to address the underrepresentation of underrepresented minority URM
                        candidates in academia by providing a platform that connects academia, URM candidates, diversity,
                        equity, and inclusion DEI officers, and recruiters.<br /> The website serves as a centralized platform that
                        facilitates communication, job search, and matching processes. This report provides an in-depth
                        understanding of the project, focusing on the entity relationship diagram ERD and the system's
                        functionality.
                    </p>
                </section>

                {/* <!-- Goal Content --> */}
                <section id="goal">
                    <h2>Your SUCCESS story is next</h2>
                    <p>The application is a comprehensive tool to connect students to institutions that provide advancement of
                        knowledge and the pursuit of excellence.
                    </p>
                </section>
            </main>

            <IndexFooter />
        </Fragment >
    )
}

export default Index;