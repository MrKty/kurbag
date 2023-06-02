import React, {useEffect, useState} from "react";
import {Container, Row, Col, Card, Button, Form} from "react-bootstrap";
import CareerExpertNavBar from "../components/CareerExpertNavBar";
import NavBar from "../components/NavBar";
import EditProfileModal from "../components/modals/EditProfileModal";
import ExperienceCard from "../components/ExperienceCard";
import EducationCard from "../components/EducationCard";
import ProfileCard from "../components/ProfileCard";
import sendRequest from "../utils/request";
import AddEducationModal from "../components/modals/AddEducationModal";
import AddWorkExperienceModal from "../components/modals/AddWorkExperienceModal";


const Profile = () => {
    const [workExperiences, setWorkExperiences] = useState([]);
    const [educationExperiences, setEducationExperiences] = useState([]);
    const [profileData, setProfileData] = useState(null);
    const [name, setName] = useState("");
    const [headline, setHeadline] = useState("");
    const [location, setLocation] = useState("");
    const [bio, setBio] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [showEducationModal, setShowEducationModal] = useState(false);
    const [showWorkExperienceModal, setShowWorkExperienceModal] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // Perform form submission logic here
        console.log("Form submitted");
    };
    const handleEditProfile = () => {
        setShowModal(true);
    };

    const handleAddEducation = () => {
        setShowEducationModal(true);
    };

    const handleAddWorkExperience = () => {
        setShowWorkExperienceModal(true);
    };

    const handleClose = () => {
        setShowModal(false);
        profileFetch();
    };

    const handleEducationModalClose = () => {
        setShowEducationModal(false);
        eduFetch();
    };
    const handleWorkExperienceModalClose = () => {
        setShowWorkExperienceModal(false);
        workExpFetch();
    };

    const profileFetch = () => {
        const userId = localStorage.getItem("userId");

        sendRequest('profile-real', 'POST', {userId}, (data) => {
            // Here comes blog data from backend
            setProfileData(data)
        });
    }

    const workExpFetch = () => {
        const userId = localStorage.getItem("userId");

        sendRequest('get-work-experience', 'POST', {userId}, (data) => {
            // Here comes blog data from backend
            setWorkExperiences(data)
        });
    }

    const eduFetch = () => {
        const userId = localStorage.getItem("userId");

        sendRequest('get-education', 'POST', {userId}, (data) => {
            // Here comes blog data from backend
            setEducationExperiences(data)
        });
    }

    //fetch the profile data from backend.
    useEffect( () => {
        profileFetch()
        workExpFetch()
        eduFetch()
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
                                    sector={profileData.current_sector}
                                    position={profileData.current_position}
                                    city={profileData.current_city}
                                    country={profileData.current_country}
                                    connectionCount={profileData.connections}
                                    profilePicture={profileData.profilePicture}
                                    handleEditProfile={handleEditProfile}
                                    handleAddWorkExperience={handleAddWorkExperience}
                                    handleAddEducation={handleAddEducation}
                                />
                            </Col>
                        </Row>
                    </div>
                    {/* Render work experience div only if workExperiences array is not empty */}
                    {/* Render work experience div only if workExperiences array exists and has length */}
                    {workExperiences && workExperiences.length > 0 && (
                        <div>
                            <h2 className={"mt-2"} style={{ fontSize: "2.5rem" }}>
                                Work Experience
                            </h2>
                            <Row>
                                {workExperiences.map((work_experience) => (
                                    <Row key={work_experience.exp_id}>
                                        <ExperienceCard
                                            companyLogo=""
                                            companyName={work_experience.org_name}
                                            role={work_experience.profession}
                                            startDate={work_experience.start_date}
                                            endDate={work_experience.end_date}
                                            about={work_experience.description}
                                        />
                                    </Row>
                                ))}
                            </Row>
                        </div>
                    )}

                    {/* Render education div only if educationExperiences array exists and has length */}
                    {educationExperiences && educationExperiences.length > 0 && (
                        <div>
                            <h2 className={"mt-2"} style={{ fontSize: "2.5rem" }}>
                                Education
                            </h2>
                            <Row>
                                {educationExperiences.map((education) => (
                                    <Row key={education.exp_id}>
                                        <EducationCard
                                            institutionLogo=""
                                            institutionName={education.inst_name}
                                            degree={education.degree}
                                            startDate={education.start_date}
                                            endDate={education.end_date}
                                            dept={education.dept.toUpperCase()}
                                        />
                                    </Row>
                                ))}
                            </Row>
                        </div>
                    )}

                </Col>
            </Row>
            <EditProfileModal showModal={showModal} handleClose={handleClose}/>
            <AddEducationModal showModal={showEducationModal} handleClose={handleEducationModalClose}/>
            <AddWorkExperienceModal showModal={showWorkExperienceModal} handleClose={handleWorkExperienceModalClose}/>
        </Container>
    );
};

export default Profile;
