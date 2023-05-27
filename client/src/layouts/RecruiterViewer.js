import {Card, Button, Row, Col, Badge, Navbar, Container, Image, Modal, Form} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faThumbsUp,
    faComment,
    faCheck,
    faSave,
    faEnvelope,
    faAdd,
    faPlus,
    faAngleUp, faAngleDown
} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import React, {useState} from "react";
import RecruiterNavBar from "../components/RecruiterNavBar";

const JobListing = ({position, postDate, numOfApplications}) => (
    <Row className="border-bottom p-2" style={{backgroundColor: position === "Data Analyst" ? "#ecebeb" : "white"}}>
        <Col>
            <h5>{position}</h5>
            <p className="mb-1">Post Date: {postDate}</p>
            <p className="mb-0">Number of Applications: {numOfApplications}</p>
        </Col>
    </Row>
);

const ApplicantListing = ({name, date, photo, resume}) => (
    <Row className="border-bottom p-2" style={{backgroundColor: name === "John Doe" ? "#ecebeb" : "white"}}>
        <Col md={2}>
            <Image src={photo} fluid rounded/>
        </Col>
        <Col md={10}>
            <Row>
                <Col><h6>{name}</h6></Col>
                <Col>{date}</Col>
            </Row>
            <Row>
                <Col className={"col-4 align-self-center"}>
                    <Link to={"#"} className={"no-underline"}>Resume</Link>
                </Col>
                <Col>
                    <button className={"btn btn-success btn-sm"}>
                        <FontAwesomeIcon icon={faCheck} className="me-2"/>
                        Approve
                    </button>
                </Col>
                <Col>
                    <button className={"btn btn-secondary btn-sm"}>
                        <FontAwesomeIcon icon={faEnvelope} className="me-2"/>
                        Message
                    </button>
                </Col>
            </Row>
        </Col>
    </Row>
);

const data = [
    {
        position: 'Data Analyst',
        postDate: '24.03.2023',
        numOfApplications: 5
    },
    {
        position: 'Software Engineer',
        postDate: '01.04.2023',
        numOfApplications: 750
    },
    {
        position: 'Marketing Manager',
        postDate: '12.04.2023',
        numOfApplications: 500
    },
    {
        position: 'Graphic Designer',
        postDate: '03.04.2023',
        numOfApplications: 250
    },
    {
        position: 'Customer Support Specialist',
        postDate: '18.04.2023',
        numOfApplications: 800
    },
    {
        position: 'Financial Analyst',
        postDate: '09.04.2023',
        numOfApplications: 600
    },
    {
        position: 'Human Resources Coordinator',
        postDate: '06.04.2023',
        numOfApplications: 400
    },
    {
        position: 'Sales Representative',
        postDate: '20.04.2023',
        numOfApplications: 900
    },
    {
        position: 'Web Developer',
        postDate: '14.04.2023',
        numOfApplications: 700
    },
    {
        position: 'Project Manager',
        postDate: '08.04.2023',
        numOfApplications: 550
    }
];

const appData = [
    {
        id: 1,
        name: "John Doe",
        date: "2022-02-14",
        photo: "https://randomuser.me/api/portraits/men/1.jpg",
        resume: "link goes here"
    },
    {
        id: 2,
        name: "Jane Doe",
        date: "2022-02-12",
        resume: "link goes here",
        photo: "https://randomuser.me/api/portraits/women/2.jpg"
    },
    {
        id: 3,
        name: "Bob Smith",
        date: "2022-02-10",
        photo: "https://randomuser.me/api/portraits/men/3.jpg",
        resume: "link goes here"
    },
    {
        id: 4,
        name: "Alice Johnson",
        date: "2022-02-09",
        photo: "https://randomuser.me/api/portraits/women/4.jpg",
        resume: "link goes here"
    },
    {
        id: 5,
        name: "Michael Brown",
        date: "2022-02-08",
        photo: "https://randomuser.me/api/portraits/men/5.jpg",
        resume: "link goes here"
    },
];

const RecruiterViewer = () => {

    const handleClick = () => {
    };

    return (
        <Container fluid>
            <RecruiterNavBar handleClick={handleClick} activeLink={"recruiter-view"}/>
            <Row>
                <Col className="col-3 border">
                    {data.map(job => (
                        <JobListing
                            key={job.position}
                            position={job.position}
                            postDate={job.postDate}
                            numOfApplications={job.numOfApplications}
                        />
                    ))}
                </Col>
                <Col className="col-4 border">
                    {appData.map(application => (
                        <ApplicantListing
                            key={application.id}
                            name={application.name}
                            date={application.date}
                            photo={application.photo}
                            resume={application.resume}
                        />
                    ))}
                </Col>
                <Col className="col-5 border" style={{backgroundColor: "#ecebeb"}}>
                    <h3 className={"p-2 border-bottom"}>Application Info:</h3>
                    <h5 className={"p-2 border-bottom"}>Contact Info:</h5>
                    <Col className="d-flex align-items-center mb-3">
                        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile photo"
                             className="rounded-circle me-3" style={{width: "100px"}}/>
                        <Row>
                            <Row className={"my-2"}>
                                <Col className={"col-6 align-self-center fw-bold"}>Name:</Col>
                                <Col>John Doe</Col>
                            </Row>
                            <Row className={"mb-2"}>
                                <Col className={"col-6 align-self-center fw-bold"}>Phone Number:</Col>
                                <Col>+90 0536 333 22 11</Col>
                            </Row>
                            <Row>
                                <Col className={"col-6 align-self-center fw-bold"}>Email:</Col>
                                <Col>john.doe@bilkent.edu.tr</Col>
                            </Row>
                        </Row>
                    </Col>
                    <Row className="d-flex align-items-center m-3">
                        <Row className={"fw-bold"}>Summary:</Row>
                        <Row>About info about the applicant goes here.</Row>
                    </Row>
                    <Row className="d-flex align-items-center m-3">
                        <Row className={"fw-bold"}>Headline:</Row>
                        <Row>CS Student @ Bilkent University</Row>
                    </Row>
                    <h5 className={"p-2 border-bottom"}>Address Info:</h5>
                    <p className={"mx-2"}>Kurtuluş Mah. Hürriyet Cad. No.50 Gönen/Balıkesir, 10900.</p>
                    <h5 className={"p-2 border-bottom"}>Resume:</h5>
                    <button className={"btn btn-outline-primary"}>Download Resume</button>
                    <Row className="d-flex align-items-center m-3">
                        <Row className={"fw-bold"}>Cover Letter:</Row>
                        <Row>Dear Hiring Manager,<br/>
                            I am excited to apply for the Data Analyst position at Sony. With a strong background in
                            data
                            analysis and programming, I am confident in my ability to help drive the success of the
                            company. I am eager to contribute my skills to the team and collaborate on exciting
                            projects.
                            Thank you for considering my application.<br/>
                            Sincerely, John Doe</Row>
                    </Row>
                    <Row className="d-flex align-items-center m-3">
                        <Row className={"fw-bold"}>Listed Skills:</Row>
                        <Row>
                            <Col className={"col-1"}>
                                <Badge bg={"info"}>SQL</Badge>
                            </Col>
                            <Col className={"col-1 me-3"}>
                                <Badge bg={"info"}>DBMS</Badge>
                            </Col>
                            <Col className={"col-1 me-4"}>
                                <Badge bg={"info"}>Python</Badge>
                            </Col>
                            <Col className={"col-1"}>
                                <Badge bg={"info"}>Java</Badge>
                            </Col>
                        </Row>
                    </Row>
                    <h5 className={"p-2 border-bottom"}>Photo</h5>
                    <Row className="d-flex align-items-center m-1">
                        <button className={"btn btn-outline-primary col-4"}>Download Photo</button>
                    </Row>
                    <h5 className={"p-2 border-bottom"}>Work Experience</h5>
                    <Card className={"mb-2"}>
                        <Card.Body>
                            <Card.Text>
                                Your title: <strong>Information Technology Trainee</strong><br/>
                                Company: <strong>FNSS Savunma Sistemleri A.Ş</strong><br/>
                                Dates of Employment: <strong>Jun 2022 - Jul 2022</strong><br/>
                                Industry: <strong>Defence Industry</strong><br/>
                                Description: <strong>Employee Tracking System was developed using Spring Boot.</strong>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Row><h5>Education:</h5></Row>
                    <Card className={"mb-2"}>
                        <Card.Body>
                            <Card.Text>
                                School: <strong>Bilkent Üniversitesi</strong><br/>
                                Degree: <strong>Bachelor's Degree</strong><br/>
                                Major / Field of Study: <strong>Computer Science</strong><br/>
                                Dates attended: <strong>Sep 2019 - Jun 2024</strong>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card className={"mb-2"}>
                        <Card.Body>
                            <Card.Text>
                                School: <strong>Tofaş Fen Lisesi</strong><br/>
                                Degree: <strong>High School Diploma</strong><br/>
                                Major / Field of Study: <strong>Science</strong><br/>
                                Dates attended: <strong>Sep 2015 - Jun 2019</strong>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )

};

export default RecruiterViewer;