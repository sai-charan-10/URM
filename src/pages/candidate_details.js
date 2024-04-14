import React, { Fragment, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import InstituteHeader from './InstituteHeader';
import IndexFooter from './IndexFooter';
import axios from 'axios';

function CandidateDetails() {
    const [candidateDetails, setCandidateDetails] = useState([]);
    const [candidateResume, setCandidateResume] = useState(null);
    const { candidateId } = useParams();

    useEffect(() => {
        axios.post('http://localhost/candidate_fetch_by_Id.php', { id: candidateId })
            .then((response) => {
                if (response.data.status === 'success') {
                    setCandidateDetails(response.data.details);
                    setCandidateResume(response.data.resume);
                } else {
                    console.error(response.data.message);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }, [candidateId]); // Add candidateId to dependency array

    return (
        <Fragment>
            <header>
                <div className="header-container">
                    <h1>Details</h1>
                    <InstituteHeader />
                    <img src="assets/images/uta_logo.png" className="user-pic" alt=""></img>
                </div>
            </header>
            <main>
                <div>
                    {candidateDetails.map((candidate) => (
                        <div key={candidate.candidateID}>
                            <h1>{candidate.name}</h1>
                            <p>Education: {candidate.education}</p>
                            <p>Field: {candidate.fieldOfStudy}</p>
                            <p>Experience: {candidate.experience}</p>
                            <p>Summary: {candidate.summary}</p>
                            <p>Race: {candidate.race}</p>
                            {/* Render resume as a link */}
                            {/*<a href={candidateResume} target="_blank" rel="noopener noreferrer">View Resume</a>*/}

                            <a href={`data:application/pdf;base64,${candidateResume}`} download="resume.pdf">Download Resume</a>
                        </div>
                    ))}
                </div>
            </main>
            
            <IndexFooter />
        </Fragment>
    );
}

export default CandidateDetails;
