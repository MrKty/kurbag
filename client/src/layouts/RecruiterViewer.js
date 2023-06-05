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

const JobListing = ({position, postDate, jobId, numOfApplications, onClick, selectedJobId}) => (
    <Row
        className="border-bottom p-2"
        style={{
            backgroundColor: selectedJobId === jobId ? "#ecebeb" : "white",
        }}
        onClick={() => onClick(jobId)}>
        <Col>
            <h5>{position}</h5>
            <p className="mb-1">Post Date: {postDate}</p>
            <p className="mb-0">Number of Applications: {numOfApplications}</p>
            <p className="mb-0">Job ID: {jobId}</p>
        </Col>
    </Row>
);

const ApplicantListing = ({ applicantId, name, date, photo, resume, onClick, userId, jobId}) => {

    const [approve, setApprove] = useState("Approve")
    const handleApproveClick = () => {
        const requestData = {
            jobId,
            applicantId
        };
        sendRequest('approve-application', 'POST', requestData, (data) => {
            // Handle the response data here
        });

        setApprove("Approved")
    };

    return (
        <Row
            className="border-bottom p-2"
            style={{
                backgroundColor: userId === applicantId ? "#ecebeb" : "white",
            }}
            onClick={() => onClick(applicantId)}>
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
                        <Link to={resume} className={"no-underline"}>Resume</Link>
                    </Col>
                    <Col>
                        <button className={"btn btn-success btn-sm"} onClick={handleApproveClick}>
                            <FontAwesomeIcon icon={faCheck} className="me-2"/>
                            {approve}
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
};


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
    const [applicantList, setApplicantList] = useState([]);
    const [postedJobs, setPostedJobs] = useState([]);
    const [userId, setuserId] = useState(null);
    const [selectedJobId, setSelectedJobId] = useState(null);

    useEffect(() => {
        sendRequest('get-applications', 'POST', {selectedJobId}, (data) => {
            setApplicantList(data.applications);
        });
    }, [selectedJobId]);

    useEffect(() => {
        sendRequest('get-job-listings', 'POST', {}, (data) => {
            setPostedJobs(data.job_listings);
        });
    }, []);

    useEffect(() => {
        // Fetch data from Sends_Request table
        sendRequest('get-application-info', 'POST', {userId}, (data) => {
            if (data.application_info) {
                setSummary(data.application_info.summary)
                setResume(data.application_info.resume)
                setCoverLetter(data.application_info.coverLetter)
                setSkillArray(data.application_info.skills.split(','));
            }
        });
        sendRequest('get-applicant-info', 'POST', {userId}, (data) => {
            if (data.applicant_info) {
                setName(data.applicant_info.name)
                setPhoneNumber(data.applicant_info.phoneNumber)
                setEmail(data.applicant_info.email)
                setProfilePhoto(data.applicant_info.profilePhoto)
            }
        });
        sendRequest('get-work-experience', 'POST', {userId}, (data) => {
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
        sendRequest('get-education', 'POST', {userId}, (data) => {
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
    }, [userId]);





    return (
        <Container fluid>
            <RecruiterNavBar activeLink={"recruiter-view"}/>
            <Row>
                <Col className="col-3 border">
                    {postedJobs.length ? (
                        postedJobs.map(jobListing => (
                            <JobListing
                                position={jobListing.job_title}
                                postDate={jobListing.post_date}
                                numOfApplications={jobListing.num_applications}
                                jobId={jobListing.job_id}
                                onClick={() => setSelectedJobId(jobListing.job_id)}
                                selectedJobId={selectedJobId}
                            />
                        ))
                    ) : (
                        <p>No listings...</p>
                    )}
                </Col>
                <Col className="col-4 border">
                    {applicantList.length ? (
                        applicantList.map(application => (
                            <ApplicantListing
                                applicantId={application.applicantId}
                                name={application.name}
                                date={application.dueDateApply}
                                photo={application.profilePhoto}
                                resume={application.resume}
                                onClick={() => setuserId(application.applicantId)}
                                userId={userId}
                                jobId={selectedJobId}
                            />
                        ))
                    ) : (
                        <p>No applications...</p>
                    )}
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