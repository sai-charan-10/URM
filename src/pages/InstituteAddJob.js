import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InstituteHeader from './InstituteHeader';
import IndexFooter from './IndexFooter';
import axios from 'axios';


function InstituteAddJob() {
    const userID = window.localStorage.getItem("userId");
    //track changes in variables
    const [values, setValues] = useState({
        job_name: '',
        department: '',
        description: '',
        location: '',
        qualification: '',
        salary: '',
        institutionID: userID,
    })

    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }

    //navigate between pages
    let history = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            job_name: values.job_name,
            department: values.department,
            description: values.description,
            location: values.location,
            qualification: values.qualification,
            salary: values.salary,
            institutionID: values.institutionID,
        };

        console.log(data);

        // registerRequest();

        // Call the API to register the candidate
        axios.post('http://localhost/job_add.php', data)
            .then((response) => {
                if (response.data.status === 'success') {
                    // Registration successful, navigate to the next page with URL parameter
                    alert('Job added')
                    history('/institute_jobposted')
                    // history.push('/institute_jobposted?jobs=' + JSON.stringify(response.data.jobs));
                } else {
                    // Registration failed, show an alert with the error message
                    alert(response.data.message);
                    history('/institute_add_job');
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <Fragment>
            <header>
                <div className="header-container">
                    <h1>Add Job</h1>
                    <InstituteHeader />
                    <img src="assets/images/uta_logo.png" className="user-pic" alt=""></img>
                </div>
            </header>


            <main>
                {/* <!-- Candidate Registration Content --> */}
                <section id="registerpage">
                    <div className="overlay">
                        <div className="content">
                            <div id="candidateForm">
                                <form action="" onSubmit={handleSubmit}>

                                    <label htmlFor="job_name">Title:</label>
                                    <input
                                        type="text"
                                        id="job_name"
                                        name="job_name"
                                        placeholder='Enter job_name'
                                        onChange={handleInput}
                                        value={values.job_name}
                                        required
                                    />

                                    <label htmlFor="department">Department:</label>
                                    <select id="department" name="department" onChange={handleInput} required value={values.department}>
                                        <option value="">Select Department type</option>
                                        <option value="engineering">Engineering</option>
                                        <option value="business">Business</option>
                                        <option value="literature">Literature</option>
                                    </select>

                                    <br />
                                    <br />



                                    <label htmlFor="description">Description:</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        placeholder="Enter description"
                                        onChange={handleInput}
                                        value={values.description}
                                        required
                                    />

                                    <label htmlFor="location">Location:</label>
                                    <input
                                        type="text"
                                        id="location"
                                        name="location"
                                        placeholder='Enter location'
                                        onChange={handleInput}
                                        value={values.location}
                                        required
                                    />


                                    <label htmlFor="qualification">Required Qualification:</label>
                                    <select id="qualification" name="qualification" onChange={handleInput} required value={values.qualification}>
                                        <option value="">Select minimum qualification</option>
                                        <option value="bs">BS</option>
                                        <option value="ms">MS</option>
                                        <option value="phd">PHD</option>
                                    </select>

                                    <br />
                                    <br />


                                    <label htmlFor="salary">Salary:</label>
                                    <input
                                        type="text"
                                        id="salary"
                                        name="salary"
                                        placeholder='Enter salary'
                                        onChange={handleInput}
                                        value={values.salary}
                                        required
                                    />

                                    <input type="submit" value="Post" className="cta-button" />
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </main>


            <IndexFooter />
        </Fragment >
    )
}

export default InstituteAddJob;