import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import CareerExpertNavBar from "../components/CareerExpertNavBar";
import NavBar from "../components/NavBar";
import EditProfileModal from "../components/modals/EditProfileModal";

const ExperienceCard = ({ companyLogo, companyName, role, startDate, endDate }) => {
  return (
    <Card className="mb-3">
      <Card.Body>
        <Row>
          <Col xs={3} md={2}>
            <img src={companyLogo} alt="Company Logo" className="img-fluid" />
          </Col>
          <Col xs={9} md={10}>
            <h5>{companyName}</h5>
            <p>{role}</p>
            <p>
              {startDate} - {endDate}
            </p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const EducationCard = ({ institutionLogo, institutionName, degree, startDate, endDate }) => {
    return (
      <Card className="mb-3">
        <Card.Body>
          <Row>
            <Col xs={3} md={2}>
              <img src={institutionLogo} alt="Company Logo" className="img-fluid" />
            </Col>
            <Col xs={9} md={10}>
              <h5>{institutionName}</h5>
              <p>{degree}</p>
              <p>
                {startDate} - {endDate}
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    );
  };

  const ProfileCard = ({
    firstName,
    lastName,
    birthDate,
    gender,
    connectionCount,
    profilePicture,
    handleEditProfile,
  }) => {
    
      return (
        <Card>
          <Card.Body>
            <Row className="align-items-center">
              <Col xs={12} sm={3} md={2} className="text-center mb-3 mb-sm-0">
                <img src={profilePicture} alt="Profile Picture" roundedCircle fluid />
              </Col>
              <Col xs={12} sm={9} md={10}>
                <h4>{firstName} {lastName}</h4>
                <p><strong>Birth Date:</strong> {birthDate}</p>
                <p><strong>Gender:</strong> {gender}</p>
                <p><strong>Connections:</strong> {connectionCount}</p>
                <Button variant="primary" onClick={handleEditProfile}>Edit Profile</Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      );
  };
  

const Profile = () => {
  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [location, setLocation] = useState("");
  const [bio, setBio] = useState("");
  const [userType, setUserType] = useState(0);
  const [showModal, setShowModal] = useState(false);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    console.log("Form submitted");
  };
  const handleEditProfile = () => {
    setShowModal(true);
  };
  const handleClick = (type) => {
    if (userType === type) {
        // Rerender the page
        // Add your code to rerender the page here
        console.log('Rerendering page');
        setUserType(0);
    } else {
        // Open the popup
        setShowModal(true);
        setUserType(type);
    }
    };
    const handleClose = () => {
        setShowModal(false);
    };

  return (
    <Container fluid>
        {userType === 1 ? <CareerExpertNavBar handleClick={handleClick} activeLink="profile"/> :
        <NavBar handleClick={handleClick} activeLink="profile"/>}
        
        
      <Row className="justify-content-center">
        <Col xs={10} md={10} lg={10}>
            <div>
            <h2 className={"mt-2"} style={{fontSize: '2.5rem'}}>Profile</h2>

            <Row>
            <Col>
                <ProfileCard
                    firstName = "İpek"
                    lastName = "Öztaş"
                    birthDate = "08.05.2002"
                    gender = "Female"
                    connectionCount = "350"
                    profilePicture= ""
                    handleEditProfile = {handleEditProfile}
                />
            </Col>
            </Row>
            </div>
            <div>
            <h2 className={"mt-2"} style={{fontSize: '2.5rem'}}>Work Experience</h2>

                <Row>
                <Col>
                    <ExperienceCard
                        companyLogo = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fw3.bilkent.edu.tr%2Fwww%2Fbilkent-logo%2F&psig=AOvVaw1F3CD6WwwSkALLpSp-DlAf&ust=1685004880839000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNjyirzKjf8CFQAAAAAdAAAAABAE"
                        companyName = "Bilkent University"
                        role = "CS115 Tutor"
                        startDate = "15.09.2022"
                        endDate = "30.01.2023"
                    />
                </Col>
            </Row>
            </div>
            <div>
            <h2 className={"mt-2"} style={{fontSize: '2.5rem'}}>Education</h2>

                <Row>
                <Col>
                    <EducationCard
                        institutionLogo = "https://www.google.com/url?sa=i&url=https%3A%2F%2Fw3.bilkent.edu.tr%2Fwww%2Fbilkent-logo%2F&psig=AOvVaw1F3CD6WwwSkALLpSp-DlAf&ust=1685004880839000&source=images&cd=vfe&ved=0CBEQjRxqFwoTCNjyirzKjf8CFQAAAAAdAAAAABAE"
                        institutionName = "Bilkent University"
                        degree = "Bachelor's Degree"
                        startDate = "2020"
                        endDate = "2024"
                    />
                </Col>
            </Row>
            </div>
          
        </Col>
      </Row>
      <EditProfileModal showModal={showModal} handleClose={handleClose}/>
    </Container>
  );
};

export default Profile;
