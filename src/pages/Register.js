import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import RegisterHeader from './RegisterHeader';
import IndexFooter from './IndexFooter';
import RegisterValidation from './RegisterValidation';
import axios from 'axios';


function Register() {

    //track changes in variables
    const [values, setValues] = useState({
        type: '',
        name: '',
        email: '',
        phoneNumber: '',
        password: '',
    })

    const handleInput = (event) => {
        setValues({ ...values, [event.target.name]: event.target.value })
    }
    const addField = (fieldName, fieldValue) => {
        setValues(prevValues => ({
            ...prevValues,
            [fieldName]: fieldValue
        }));
    };

    //track error 
    const [errors, setErrors] = useState({})
    const [institutes, setInstitutes] = useState({})
    useEffect(() => {
        axios.get('http://localhost/fetch_institutes.php')
            .then((response) => {
                if (response.data.status === 'success') {
                    // Job data fetched successfully, update the jobs state
                    setInstitutes(response.data.institutes);
                } else {
                    // Handle the case where no job data is found or there's an error
                    console.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])
    useEffect(() => {
        setErrors(RegisterValidation(values))
    }, [values])

    //navigate between pages
    let history = useNavigate();

    //Send email
    const form = useRef();

    const sendEmail = (event) => {
        event.preventDefault();
        setErrors(RegisterValidation(values));
    
        const formData = new FormData();
        formData.append('type', values.type);
        formData.append('name', values.name);
        formData.append('email', values.email);
        formData.append('password', values.password);
        formData.append('phoneNumber', values.phoneNumber);
        formData.append('address', values.address || ''); // Handle undefined fields
        formData.append('fieldofstudy', values.fieldofstudy || ''); // Handle undefined fields
        formData.append('education', values.education || ''); // Handle undefined fields
        formData.append('dofb', values.dofb || ''); // Handle undefined fields
        formData.append('summary', values.summary || ''); // Handle undefined fields
        formData.append('experience', values.experience || ''); // Handle undefined fields
        formData.append('isurm', values.isurm || ''); // Handle undefined fields
        formData.append('race', values.race || ''); // Handle undefined fields
        formData.append('resume', values.resume); // Append file object
    
        // Call the API to register the candidate
        if (values.type === 'candidate') {
            axios.post('http://localhost/candidate_register.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then((response) => {
                if (response.data.status === 'success') {
                    // Registration successful
                    history('/login');
                } else {
                    // Registration failed, show an alert with the error message
                    alert(response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        else if (values.type === 'institute') {
            axios.post('http://localhost/institute_register.php', values)
                .then((response) => {
                    if (response.data.status === 'success') {
                        // Registration successful
                        history('/login');
                    } else {
                        // Registration failed, show an alert with the error message
                        alert(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        else if (values.type === 'officer') {
            axios.post('http://localhost/officer_register.php', values)
                .then((response) => {
                    if (response.data.status === 'success') {
                        // Registration successful
                        history('/login');
                    } else {
                        // Registration failed, show an alert with the error message
                        alert(response.data.message);
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }
        else if (values.type === 'admin') {
            axios.post('http://localhost/register.php', values)
                .then((response) => {
                    if (response.data.status === 'success') {
                        // Registration successful
                        history('/login');
                    } else {
                        // Registration failed, show an alert with the error message
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
                    <h1>Register</h1>
                    <RegisterHeader />
                </div>
            </header>


            <main>
                {/* <!-- Candidate Registration Content --> */}
                <section id="registerpage">
                    <div className="overlay">
                        <div className="content">
                            <div id="candidateForm">
                                <form ref={form} action="" onSubmit={sendEmail}>

                                    <label htmlFor="type">Type:</label>
                                    <select id="type" name="type" onChange={handleInput} required value={values.type}>
                                        <option value="">Select registration type</option>
                                        <option value="candidate">Candidate</option>
                                        <option value="institute">Institute</option>
                                        <option value="officer">Officer</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    {errors.type && <span className='text-danger'>{errors.type}</span>}

                                    <br />

                                    <label htmlFor="name">Name:</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        placeholder='Enter name'
                                        onChange={handleInput}
                                        value={values.name}
                                        required
                                    />
                                    {errors.name && <span className='text-danger'>{errors.name}</span>}

                                    <label htmlFor="email">Email:</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        placeholder='Enter email'
                                        onChange={handleInput}
                                        value={values.email}
                                        required
                                    />
                                    {errors.email && <span className='text-danger'>{errors.email}</span>}

                                    <label htmlFor="phoneNumber">Phone Number:</label>
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        placeholder='Enter phone number'
                                        onChange={handleInput}
                                        value={values.phoneNumber}
                                        required
                                    />
                                    {errors.phoneNumber && <span className='text-danger'>{errors.phoneNumber}</span>}

                                    <label htmlFor="password">Password:</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        placeholder='Enter password'
                                        onChange={handleInput}
                                        value={values.password}
                                        required
                                    />
                                    {errors.password && <span className='text-danger'>{errors.password}</span>}

                                    {/* New field */}
                                    {values.type === "candidate" && (
                                        <Fragment>
                                            {/* Check if joiningYear field exists, if not add it */}
                                            {values.address === undefined && (
                                                addField('address', '')
                                            )}
                                            {/* Render the label and input fields if joiningYear exists */}
                                            {values.address !== undefined && (
                                                <Fragment>
                                                    <label htmlFor="address">Address:</label>
                                                    <input
                                                        type="text"
                                                        id="address"
                                                        name="address"
                                                        placeholder='Enter address'
                                                        onChange={handleInput}
                                                        value={values.address}
                                                        required
                                                    />
                                                </Fragment>
                                            )}
                                            {values.fieldofstudy === undefined && (
                                                addField('fieldofstudy', '')
                                            )}
                                            {/* Render the label and input fields if joiningYear exists */}
                                            {values.fieldofstudy !== undefined && (
                                                <Fragment>
                                                    <label htmlFor="fieldofstudy">Field:</label>
                                                    <select
                                                        id="fieldofstudy"
                                                        name="fieldofstudy"
                                                        
                                                        onChange={handleInput}
                                                        value={values.fieldofstudy}
                                                    >
                                                        <option value="">Select Field of Study</option>
                                                        <option value="computer-science">Computer Science</option>
                                                        <option value="chemistry">Chemistry</option>
                                                        <option value="biology">Biology</option>
                                                        <option value="physics">Physics</option>
                                                        <option value="mathematics">Mathematics</option>
                                                        {/* Add more options as needed */}
                                                    </select>
                                                </Fragment>
                                            )}
                                            {values.education === undefined && (
                                                addField('education', '')
                                            )}
                                            {/* Render the label and input fields if joiningYear exists */}
                                            {values.education !== undefined && (
                                                <Fragment>
                                                    <label htmlFor="education">Education:</label>
                                                    <input
                                                        type="text"
                                                        id="education"
                                                        name="education"
                                                        placeholder='Enter education'
                                                        onChange={handleInput}
                                                        value={values.education}
                                                        required
                                                    />
                                                </Fragment>
                                            )}
                                            {values.dofb === undefined && (
                                                addField('dofb', '')
                                            )}
                                            {/* Render the label and input fields if joiningYear exists */}
                                            {values.dofb !== undefined && (
                                                <Fragment>
                                                    <label htmlFor="dofb">Date of Birth:</label>
                                                    <input
                                                        type="date"
                                                        id="dofb"
                                                        name="dofb"
                                                        placeholder='Enter Date of Birth'
                                                        onChange={handleInput}
                                                        value={values.dofb}
                                                        required
                                                    />
                                                </Fragment>
                                            )}
                                            {values.summary === undefined && (
                                                addField('summary', '')
                                            )}
                                            {/* Render the label and input fields if joiningYear exists */}
                                            {values.summary !== undefined && (
                                                <Fragment>
                                                    <label htmlFor="summary">Summary:</label>
                                                    <textarea
                                                        id="summary"
                                                        name="summary"
                                                        placeholder='Write your summary'
                                                        onChange={handleInput}
                                                        value={values.summary}
                                                        required
                                                    />
                                                </Fragment>
                                            )}
                                            {values.experience === undefined && (
                                                addField('experience', '')
                                            )}
                                            {/* Render the label and input fields if joiningYear exists */}
                                            {values.experience !== undefined && (
                                                <Fragment>
                                                    <label htmlFor="experience">Experience:</label>
                                                    <input
                                                        type="text"
                                                        id="experience"
                                                        name="experience"
                                                        placeholder='Enter experience'
                                                        onChange={handleInput}
                                                        value={values.experience}
                                                        required
                                                    />
                                                </Fragment>
                                            )}
                                            {values.isurm === undefined && (
                                                addField('isurm', '')
                                            )}
                                            {/* Render the label and input fields if joiningYear exists */}
                                            {values.isurm !== undefined && (
                                                <Fragment>
                                                    <label htmlFor="isurm">Is URM:</label>
                                                    <input
                                                        type="text"
                                                        id="isurm"
                                                        name="isurm"
                                                        placeholder='Yes or No'
                                                        onChange={handleInput}
                                                        value={values.isurm}
                                                        required
                                                    />
                                                </Fragment>
                                            )}
                                            {values.race === undefined && (
                                                addField('race', '')
                                            )}
                                            {/* Render the label and input fields if joiningYear exists */}
                                            {values.race !== undefined && (
                                                <Fragment>
                                                    <label htmlFor="race">Race:</label>
                                                    <input
                                                        type="text"
                                                        id="race"
                                                        name="race"
                                                        placeholder='Enter race'
                                                        onChange={handleInput}
                                                        value={values.race}
                                                        required
                                                    />
                                                </Fragment>
                                            )}
                                            {values.resume === undefined && (
                                                addField('resume', '')
                                            )}
                                            {/* Render the label and input fields if joiningYear exists */}
                                            {values.resume !== undefined && (
                                                <Fragment>
                                                    <label htmlFor="resume">Resume:</label>
                                                    <input
                                                        type="file"
                                                        id="resume"
                                                        name="resume"
                                                        onChange={(event) =>setValues({ ...values, resume: event.target.files[0] })}
                                                        required
                                                    />
                                                </Fragment>
                                            )}
                                        </Fragment>
                                    )}
                                    {values.type === "institute" && (
                                        <Fragment>
                                            {/* Check if joiningYear field exists, if not add it */}
                                            {values.address === undefined && (
                                                addField('address', '')
                                            )}
                                            {/* Render the label and input fields if joiningYear exists */}
                                            {values.address !== undefined && (
                                                <Fragment>
                                                    <label htmlFor="address">Address:</label>
                                                    <input
                                                        type="text"
                                                        id="address"
                                                        name="address"
                                                        placeholder='Enter address'
                                                        onChange={handleInput}
                                                        value={values.address}
                                                        required
                                                    />
                                                </Fragment>
                                            )}
                                            {values.researcharea === undefined && (
                                                addField('researcharea', '')
                                            )}
                                            {/* Render the label and input fields if joiningYear exists */}
                                            {values.researcharea !== undefined && (
                                                <Fragment>
                                                    <label htmlFor="researcharea">Research Area:</label>
                                                    <input
                                                        type="text"
                                                        id="researcharea"
                                                        name="researcharea"
                                                        placeholder='Enter research area'
                                                        onChange={handleInput}
                                                        value={values.researcharea}
                                                        required
                                                    />
                                                </Fragment>
                                            )}
                                        </Fragment>
                                    )}
                                    {values.type === "officer" && (
                                        <Fragment>
                                            {/* Check if joiningYear field exists, if not add it */}
                                            {values.institute === undefined && (
                                                addField('institute', '')
                                            )}
                                            {/* Render the label and input fields if joiningYear exists */}
                                            {values.institute !== undefined && (
                                                <Fragment>
                                                    <label htmlFor="institute">Institute:</label>
                                                    <select
                                                        id="institute"
                                                        name="institute"
                                                        onChange={handleInput}
                                                        value={values.institute}
                                                    >
                                                        <option value="">Select Field of Study</option>
                                                        {institutes.map((institute) => (
                                                            <option key = {institute.institutionID} value = {institute.institutionID}>{institute.name}</option>
                                                        ))}
                                                    </select>
                                                </Fragment>
                                            )}
                                        </Fragment>
                                    )}
                                    <input type="submit" value="Register" className="cta-button" />
                                    <Link to="/login" className="cta-button">Login</Link>
                                </form>

                            </div>
                        </div>
                    </div>
                </section>
            </main>


            <IndexFooter />
        </Fragment >
    );
}

export default Register;