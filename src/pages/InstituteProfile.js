import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import InstituteHeader from './InstituteHeader';
import IndexFooter from './IndexFooter';
import axios from 'axios';

function InstituteProfile() {

    const userID = window.localStorage.getItem("userId");

    const [profileName, setProfileName] = useState('');
    const [profileEmail, setProfileEmail] = useState('');
    const [profilePassword, setProfilePassword] = useState('');
    const [profileAddress, setProfileAddress] = useState('');
    const [profilePhoneNumber, setProfilePhoneNumber] = useState('');
    const [profileResearchFocus, setProfileResearchFocus] = useState('');
    const [message, setMessage] = useState('');


    const uploadFiles = async () => {
        const formData = new FormData()
        formData.append('userID', userID)
        formData.append('pName', profileName)
        formData.append('pEmail', profileEmail)
        formData.append('pPassword', profilePassword)
        formData.append('pAddress', profileAddress)
        formData.append('pPhoneNumber', profilePhoneNumber)
        formData.append('pResearchFocus', profileResearchFocus)

        const response = await axios.post("http://localhost/update_institute_profile.php", formData, {
            headers: { 'Content-Type': "multipart/form-data" },
        })

        if (response.data.success) {
            setMessage(response.data.success)
            alert('Profile Updated successfully')
        }
    }


    const handleLoadData = () => {
        fetchProfile(userID); // Use the existing fetchProfile function
    };

    const fetchProfile = (userID) => {
        const data = {
            userId: userID,
        };

        axios.post('http://localhost/fetch_institute_profile.php', data)
            .then((response) => {
                if (response.data.status === 'success') {
                    alert('Profile Data fetched successfully', response.data.profileData)
                    console.log('Data:', response.data.profileData['name'])

                    setProfileName(response.data.profileData['name']);
                    setProfileEmail(response.data.profileData['email']);
                    setProfilePassword(response.data.profileData['password']);
                    setProfileAddress(response.data.profileData['address']);
                    setProfilePhoneNumber(response.data.profileData['phoneNumber']);
                    setProfileResearchFocus(response.data.profileData['researchArea']);


                } else {
                    console.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error.response);
            });
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        await uploadFiles();
    };

    return (
        <Fragment>
            <header>
                <div className="header-container">
                    <h1>Profile</h1>
                    <InstituteHeader />
                </div>
            </header>

            <main>
                {/* <!-- Candidate Profile Content --> */}
                <section id="profile" className="tile">
                    <form onSubmit={handleUpdateProfile}>
                        <div className="profile-image">
                            <span className="image fit">
                                <img src="assets/images/uta_logo.png" alt="" />
                            </span>

                            <div className="profile-actions">
                                <button type="button" className="cta-button" onClick={() => handleLoadData(userID)}>Load</button>
                            </div>
                        </div>
                        <div className="profile-info content">
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your Name"
                                value={profileName}
                                onChange={(e) => setProfileName(e.target.value)}
                            />

                            <label htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Your Email"
                                value={profileEmail}
                                onChange={(e) => setProfileEmail(e.target.value)}
                            />

                            <label htmlFor="password">Password:</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Your Password"
                                value={profilePassword}
                                onChange={(e) => setProfilePassword(e.target.value)}
                            />

                            <label htmlFor="address">Address:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Your Address"
                                value={profileAddress}
                                onChange={(e) => setProfileAddress(e.target.value)}
                            />

                            <label htmlFor="phone-number">Phone Number:</label>
                            <input
                                type="tel"
                                id="phone-number"
                                name="phone-number"
                                placeholder="Your Phone Number"
                                value={profilePhoneNumber}
                                onChange={(e) => setProfilePhoneNumber(e.target.value)}
                            />

                            <label htmlFor="field-of-study">Research Area:</label>
                            <input
                                id="field-of-study"
                                name="field-of-study"
                                value={profileResearchFocus}
                                onChange={(e) => setProfileResearchFocus(e.target.value)}
                            />
                        </div>
                        <div className="profile-actions">
                            <button type="submit">Save Profile</button>
                        </div>
                    </form>
                </section>
            </main>


            <IndexFooter />
        </Fragment >
    )
}

export default InstituteProfile;