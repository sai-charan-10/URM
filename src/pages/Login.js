import React, { Fragment, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import IndexHeader from './IndexHeader';
import IndexFooter from './IndexFooter';
import LoginValidation from './LoginValidation';
import axios from 'axios';

function Login() {

    let history = useNavigate();

    const [userData, setUserData] = useState(null);

    const [values, setValues] = useState({
        type: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({});

    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const validationErrors = LoginValidation(values);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const data = {
                type: values.type,
                email: values.email,
                password: values.password,
            };

            axios.post('http://localhost/login.php', data)
                .then((response) => {
                    if (response.data.status === 'success') {
                        const { type, userData } = response.data;
                        setUserData(userData);
                        window.localStorage.setItem('isLoggedIn', true);
                        window.localStorage.setItem('userType', type);

                        switch (type) {
                            case 'candidate':
                                window.localStorage.setItem('userId', userData['candidateID']);
                                break;
                            case 'institute':
                                window.localStorage.setItem('userId', userData['institutionID']);
                                break;
                            case 'recruiter':
                                window.localStorage.setItem('userId', userData['recruiterID']);
                                break;
                            case 'officer':
                                window.localStorage.setItem('userId', userData['officerID']);
                                break;
                            case 'admin':
                                window.localStorage.setItem('userId', userData['adminID']);
                                break;
                            default:
                                break;
                        }

                        switch (type) {
                            case 'candidate':
                                history('/candidate_dashboard');
                                break;
                            case 'institute':
                                history('/institute_dashboard');
                                break;
                            case 'recruiter':
                                history('/recruiter_dashboard');
                                break;
                            case 'officer':
                                history('/officer_dashboard');
                                break;
                            case 'admin':
                                history('/admin_dashboard');
                                break;
                            default:
                                alert('Invalid user type');
                                break;
                        }
                    } else {
                        // Login failed, show an alert with the error message
                        alert(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
    };

    return (
        <Fragment>

            <header>
                <div className="header-container">
                    <h1>Login</h1>
                    <IndexHeader />
                    <img src="assets/images/uta_logo.png" className="user-pic" alt=""></img>
                </div>
            </header>

            <main>
                {/* <!-- Homepage Content --> */}
                <section id="loginpage">
                    <div className="tile-container">
                        <article className="style1">

                            <div className="overlay">
                                <div className="content">
                                    <form action="" onSubmit={handleSubmit}>

                                        <label htmlFor="type">Type:</label>
                                        <select id="type" name="type" onChange={handleInput} required value={values.type}>
                                            <option value="">Select login type</option>
                                            <option value="candidate">Candidate</option>
                                            <option value="institute">Institute</option>
                                            <option value="recruiter">Recruiter</option>
                                            <option value="officer">Officer</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                        {errors.type && <span className='text-danger'>{errors.type}</span>}

                                        <br />
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" id="email" name="email" placeholder='Enter email' onChange={handleInput} value={values.email} required />
                                        {errors.email && <span className='text-danger'>{errors.email}</span>}

                                        <label htmlFor="password">Password:</label>
                                        <input type="password" id="password" name="password" placeholder='Enter password' onChange={handleInput} value={values.password} required />
                                        {errors.password && <span className='text-danger'>{errors.password}</span>}

                                        <input type="submit" value="Log In" className="cta-button" />
                                        <Link to="/forgot_password">Forgot Password</Link>
                                        <Link to="/register" className=''>Sign Up</Link>
                                    </form>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            </main>

            <IndexFooter />
        </Fragment >
    )
}

export default Login;