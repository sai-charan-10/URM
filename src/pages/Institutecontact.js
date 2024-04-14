import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InstituteHeader from './InstituteHeader';
import IndexFooter from './IndexFooter';
import axios from 'axios';

function Institutecontact() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        comments: '',
    })
    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    let history = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            name: values.name,
            email: values.email,
            comments: values.comments,
        };

        console.log(data);

        // registerRequest();

        // Call the API to register the candidate
        axios.post('http://localhost/contact.php', data)
            .then((response) => {
                if (response.data.status === 'success') {
                    // Registration successful, navigate to the next page with URL parameter
                    alert('Feedback Sent')
                    history('/institute_dashboard')
                    // history.push('/institute_jobposted?jobs=' + JSON.stringify(response.data.jobs));
                } else {
                    // Registration failed, show an alert with the error message
                    alert(response.data.message);
                    history('/contact');
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
                    <h1>Contact</h1>
                    <InstituteHeader />
                </div>
            </header>
            <main>
                {/* <!-- Contact Content --> */}
                <section id="contact" className="contact-section">
                    <h2>Contact ADMIN</h2>
                    <div className="row">
                        <div className="col-8 col-12-small form-section">
                            <form action="" onSubmit={handleSubmit}>
                                <input type="text" name="name" id="name" placeholder="Name" onChange={handleInput}
                                        value={values.name}
                                        required/>
                                <input type="email" name="email" id="email" placeholder="Email" onChange={handleInput}
                                        value={values.email}
                                        required/>
                                <textarea name="comments" id="comments" placeholder="Message" rows="4" onChange={handleInput}
                                        value={values.comments}
                                        required></textarea>
                                <input type="submit" value="Post" className="cta-button" />
                            </form>
                        </div>
                        
                    </div>
                </section>
            </main>
        </Fragment >
    )
}

export default Institutecontact;