import React, { useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import CareerExpertNavBar from "../components/CareerExpertNavBar";
import NavBar from "../components/NavBar";

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

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleHeadlineChange = (event) => {
    setHeadline(event.target.value);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform form submission logic here
    console.log("Form submitted");
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
                    profilePicture= "data:image/jpeg;base64,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"
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
    </Container>
  );
};

export default Profile;
