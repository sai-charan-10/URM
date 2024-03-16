import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import OfficerHeader from './OfficerHeader';
import IndexFooter from './IndexFooter';

function OfficerPolicy() {
    return (
        <Fragment>
            <header>
                <div className="header-container">
                    <h1>Current Policy</h1>
                    <OfficerHeader />
                    <img src="assets/images/uta_logo.png" className="user-pic" alt=""></img>
                </div>
            </header>

            <main>
                <section id="jobsearch" className="tile">
                    <div className="search">
                        <button>Modify Policy</button>
                    </div>
                </section>

                <section id="homepage">
                    <h2>Purpose</h2>
                    <p>
                        The purpose of this policy is to establish guidelines for the operation
                        of the website, which serves as a platform connecting institutions and recruiters with
                        underrepresented minority candidates. The website aims to promote equal opportunities,
                        diversity, and inclusion in the recruitment process.
                    </p>
                </section>

                <section id="homepage">
                    <h2>Definition of Underrepresented Minority</h2>
                    <p>
                        For the purposes of this policy, underrepresented minority refers to
                        individuals who identify as belonging to racial, ethnic, or other marginalized groups that have
                        historically been underrepresented in various industries or sectors.
                    </p>
                </section>


                <section id="homepage">
                    <h2>Non-Discrimination</h2>
                    <p>
                        The website shall operate on the principle of non-discrimination.
                        Institutions and recruiters using the platform must not discriminate against candidates based on
                        their race, ethnicity, gender, sexual orientation, religion, disability, or any other protected
                        characteristic. Discriminatory practices will not be tolerated, and any reports of such behavior
                        will be investigated and appropriate actions taken.
                    </p>
                </section>


                <section id="homepage">
                    <h2>Platform Accessibility</h2>
                    <p>
                        The website should be designed and developed to ensure accessibility for
                        individuals with disabilities, complying with relevant accessibility standards and guidelines.
                        Efforts should be made to provide an inclusive experience to all users, regardless of their
                        abilities or assistive technologies used.
                    </p>
                </section>


            </main>

            <IndexFooter />
        </Fragment>
    )

}

export default OfficerPolicy;
