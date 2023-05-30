import React, {useEffect, useState} from "react";
import {Container, Row, Col, Card, Button, Form} from "react-bootstrap";
import CareerExpertNavBar from "../components/CareerExpertNavBar";
import NavBar from "../components/NavBar";
import EditProfileModal from "../components/modals/EditProfileModal";
import ExperienceCard from "../components/ExperienceCard";
import EducationCard from "../components/EducationCard";
import ProfileCard from "../components/ProfileCard";
import sendRequest from "../utils/request";


const Profile = () => {
    const [workExperiences, setWorkExperiences] = useState([]);
    const [educationExperiences, setEducationExperiences] = useState([]);
    const [profileData, setProfileData] = useState(null);
    const [name, setName] = useState("");
    const [headline, setHeadline] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [showModal, setShowModal] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform form submission logic here
        console.log("Form submitted");
    };
    const handleEditProfile = () => {
        setShowModal(true);
    };
    const handleClose = () => {
        setShowModal(false);
    };

    //fetch the profile data from backend.
    useEffect( () => {

        const userId = localStorage.getItem("userId");

        sendRequest('profile', 'POST', {userId}, (data) => {
            // Here comes blog data from backend
            setProfileData(data)
            setWorkExperiences(data.work_experiences)
            setEducationExperiences(data.educations)
        });
    }, [])


    if(!profileData) {
        return (
            <h2>LOADING DATA...</h2>
        )
    }

    return (
        <Container fluid>
            <NavBar activeLink="profile"/>

            <Row className="justify-content-center">
                <Col xs={10} md={10} lg={10}>
                    <div>
                        <h2 className={"mt-2"} style={{fontSize: '2.5rem'}}>Profile</h2>

                        <Row>
                            <Col>
                                <ProfileCard
                                    firstName={profileData.first_name}
                                    lastName={profileData.last_name}
                                    birthDate={profileData.birth_date}
                                    gender={profileData.gender}
                                    connectionCount={profileData.connections}
                                    profilePicture=""
                                    handleEditProfile={handleEditProfile}
                                />
                            </Col>
                        </Row>
                    </div>
                    <div>
                        <h2 className={"mt-2"} style={{ fontSize: '2.5rem' }}>Work Experience</h2>
                        <Row>
                            {workExperiences.map((work_experience) => (
                                <Row key={work_experience.exp_id}>
                                    <ExperienceCard
                                        companyLogo=""
                                        companyName={work_experience.org_name}
                                        role={work_experience.profession}
                                        startDate={work_experience.start_date}
                                        endDate={work_experience.end_date}
                                    />
                                </Row>
                            ))}
                        </Row>
                    </div>
                    <div>
                        <h2 className={"mt-2"} style={{fontSize: '2.5rem'}}>Education</h2>
                        <Row>
                            {educationExperiences.map((education) => (
                                <Row key={education.exp_id}>
                                    <EducationCard
                                        institutionLogo=""
                                        institutionName={education.inst_name}
                                        degree={education.degree}
                                        startDate={education.edu_start_date}
                                        endDate={education.edu_end_date}
                                    />
                                </Row>
                            ))}
                        </Row>
                    </div>

                </Col>
            </Row>
            <EditProfileModal showModal={showModal} handleClose={handleClose}/>
        </Container>
    );
};

export default Profile;
