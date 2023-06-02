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
import React, {useEffect, useState} from "react";
import RecruiterNavBar from "../components/RecruiterNavBar";
import sendRequest from "../utils/request";

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

function ApplicantEducation(props) {
    const {institutionName, degree, department, educationDate} = props.details
    return <Card className={"mb-2"}>
        <Card.Body>
            <Card.Text>
                School: <strong>{institutionName}</strong><br/>
                Degree: <strong>{degree}</strong><br/>
                Major / Field of Study: <strong>{department}</strong><br/>
                Dates attended: <strong>{educationDate}</strong>
            </Card.Text>
        </Card.Body>
    </Card>;
}

function ApplicantWorkExperience(props) {
    console.log(props)
    const {jobTitle, company, jobDate, jobMode, jobType, jobDescription} = props.details
    return <Card className={"mb-2"}>
        <Card.Body>
            <Card.Text>
                Your title: <strong>{jobTitle}</strong><br/>
                Company: <strong>{company}</strong><br/>
                Dates of Employment: <strong>{jobDate}</strong><br/>
                Type: <strong>{jobType}</strong><br/>
                Mode: <strong>{jobMode}</strong><br/>
                Description: <strong>{jobDescription}</strong>
            </Card.Text>
        </Card.Body>
    </Card>;
}

const RecruiterViewer = () => {
    const [workExperiences, setWorkExperiences] = useState([]);
    const [educations, setEducations] = useState([]);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [summary, setSummary] = useState("");
    const [resume, setResume] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [skillArray, setSkillArray] = useState([]);
    const [profilePhoto, setProfilePhoto] = useState("");

    useEffect(() => {
        // Fetch data from Sends_Request table
        sendRequest('get-application-info', 'POST', {applicantId: 4}, (data) => {
            if (data.application_info) {
                setSummary(data.application_info.summary)
                setResume(data.application_info.resume)
                setCoverLetter(data.application_info.coverLetter)
                setSkillArray(data.application_info.skills.split(','));
            }
        });
        sendRequest('get-applicant-info', 'POST', {applicantId: 4}, (data) => {
            if (data.applicant_info) {
                console.log(data)
                setName(data.applicant_info.name)
                setPhoneNumber(data.applicant_info.phoneNumber)
                setEmail(data.applicant_info.email)
                setProfilePhoto(data.applicant_info.profilePhoto)
            }
        });
        sendRequest('get-work-experience', 'POST', {userId: 4}, (data) => {
            if (data) {
                const workExperiences = []
                for (let i = 0; i < data.length; i++) {
                    const date = data[i].active ? data[i].start_date + " - continues"
                        : data[i].start_date + " - " + data[i].end_date;
                    workExperiences.push({
                        jobTitle: data[i].role,
                        company: data[i].org_name,
                        jobDate: date,
                        jobMode: data[i].work_mode,
                        jobType: data[i].work_type,
                        jobDescription: data[i].description
                    });
                }
                setWorkExperiences(workExperiences)
            }
        });
        sendRequest('get-education', 'POST', {userId: 4}, (data) => {
            console.log(data)
            if (data) {
                const educations = []
                for (let i = 0; i < data.length; i++) {
                    const date = data[i].start_date + " - " + data[i].end_date;
                    educations.push({
                        institutionName: data[i].inst_name,
                        degree: data[i].degree,
                        educationDate: date,
                        department: data[i].dept
                    });
                }
                setEducations(educations)
            }
        });
    }, []);


    return (
        <Container fluid>
            <RecruiterNavBar activeLink={"recruiter-view"}/>
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
                        <img src={profilePhoto} alt="Profile photo"
                             className="rounded-circle me-3" style={{width: "100px"}}/>
                        <Row>
                            <Row className={"my-2"}>
                                <Col className={"col-6 align-self-center fw-bold"}>Name:</Col>
                                <Col>{name}</Col>
                            </Row>
                            <Row className={"mb-2"}>
                                <Col className={"col-6 align-self-center fw-bold"}>Phone Number:</Col>
                                <Col>{phoneNumber}</Col>
                            </Row>
                            <Row>
                                <Col className={"col-6 align-self-center fw-bold"}>Email:</Col>
                                <Col>{email}</Col>
                            </Row>
                        </Row>
                    </Col>
                    <Row className="d-flex align-items-center m-3">
                        <Row className={"fw-bold"}>Summary:</Row>
                        <Row>{summary}</Row>
                    </Row>
                    <h5 className={"p-2 border-bottom"}>Resume:</h5>
                    <button className={"btn btn-outline-primary"}><a href={resume} target={"_blank"}>Download Resume</a>
                    </button>
                    <Row className="d-flex align-items-center m-3">
                        <Row className={"fw-bold"}>Cover Letter:</Row>
                        <Row>{coverLetter}</Row>
                    </Row>
                    <Row className="d-flex align-items-center m-3">
                        <Row className={"fw-bold"}>Listed Skills:</Row>
                        <Row>
                            {skillArray.map((skill, index) => (
                                <Col className={"col-1"}>
                                    <Badge key={index} bg={"info"} className={"me-2"}>{skill.trim()}</Badge>
                                </Col>
                            ))}
                        </Row>
                    </Row>
                    <h5 className={"p-2 border-bottom"}>Work Experience</h5>
                    {workExperiences.map((workExperience, index) => (
                        <div key={index}><ApplicantWorkExperience details={workExperience}/></div>
                    ))}
                    <Row><h5>Education:</h5></Row>
                    {educations.map((education, index) => (
                        <div key={index}><ApplicantEducation details={education}/></div>
                    ))}
                </Col>
            </Row>
        </Container>
    )

};

export default RecruiterViewer;