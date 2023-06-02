import {Row, Col, Image, Container, Badge, Button, Card, Navbar, Modal, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAdd,
    faAngleDown,
    faAngleUp,
    faEnvelope,
    faPaperPlane,
    faPlus,
    faSave,
    faCheck //kullan bunu apply edince
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import FilterBar from "../components/FilterBar";
import CareerExpertModal from "../components/modals/CareerExpertModal";
import JobDescription from "../components/JobDescription";
import JobListing from "../components/JobListing";
import sendRequest from "../utils/request";

const Jobs = () => {

    const [showModal, setShowModal] = useState(false);
    const [userType, setUserType] = useState(0);
    const [maxHeight, setMaxHeight] = useState(window.innerHeight);
    const [selectedJob, setSelectedJob] = useState(1);
    const [jobs, setJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState([]);
    const [hiringManagerPhoto, setHiringManagerPhoto] = useState("");
    const [hiringManagerName, setHiringManagerName] = useState("");
    const [hiringManagerPosition, setHiringManagerPosition] = useState("");

    const handleJobClick = (job) => {
        setSelectedJob(job);

        sendRequest("get-recruiter-info", "POST", {"recruiterId": selectedJob.recruiter_id}, (data) => {
            // Handle the response from the backend
            setHiringManagerName(data.name)
            setHiringManagerPhoto(data.photo)
            setHiringManagerPosition(data.position)
        });
    };


    useEffect(() => {

        const user_id = localStorage.getItem("userId")

        sendRequest('jobs', 'POST', {user_id}, (data) => {
            // Here comes blog data from backend
            setJobs(data);
        });
    }, []);


    useEffect(() => {
        sendRequest('applied-jobs', 'POST', {}, (data) => {
            // Here comes blog data from backend
            setAppliedJobs(data);
        });
    }, []);


    useEffect(() => {
        const handleResize = () => {
            setMaxHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleClose = () => {
        setShowModal(false);
    };

    const handleDeleteApplication = (jobId) => {
        const user_id = localStorage.getItem("userId")
        sendRequest('delete-application', 'POST', {jobId}, (data) => {
            // Here comes blog data from backend
        });
    };

    return (
        <Container fluid className="p-1">
            <NavBar activeLink="jobs"/>
            <FilterBar
                filters={["Date posted", "Experience level", "Company", "Job Type", "On-site/Remote", "Location", "Industry", "Job Title"]}/>
            <Row className="flex-grow-1">
                <Col className="col-3 mt-3 me-2" style={{overflowY: "scroll", maxHeight: maxHeight}}>
                    <Card className={"border p-2"} style={{overflowY: "auto", maxHeight: maxHeight}}>
                        <Row>
                            <Col className={"col-9"}>
                                <h4>Applied Jobs</h4>
                                <hr></hr>
                            </Col>
                            <Col>
                                <FontAwesomeIcon icon={faAngleDown} className={"px-2"}/>
                            </Col>
                        </Row>
                        <Row className="border-bottom p-2">
                            {appliedJobs.map((job) => (
                                <div key={job.id}>
                                    <Col md={9}>
                                        <Row>
                                            <h5>{job.j_title} @ {job.j_organization}</h5>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <p className="mt-2 me-auto fw-bold">{job.j_mode} - {job.j_type}</p>
                                            </Col>

                                        </Row>
                                        <Row>
                                            <Button onClick={() => handleDeleteApplication(job.j_id)} className="btn btn-danger btn-sm text-left">
                                                Cancel
                                            </Button>
                                        </Row>
                                    </Col>
                                    <hr></hr>
                                </div>
                            ))}
                        </Row>
                    </Card>
                </Col>
                <Col className="col-3 mt-3 mx-3" style={{overflowY: 'auto', maxHeight: maxHeight}}>
                    {jobs.map((job, index) => (
                        <div key={index}>
                            <JobListing
                                jobTitle={job.j_title}
                                companyName={job.j_organization}
                                companyLogo={job.companyLogo}
                                location={job.j_location}
                                isSelected={selectedJob === job}
                                onClick={() => handleJobClick(job)}
                            />
                        </div>
                    ))}

                </Col>
                <Col className="col-5 mt-3 p-2"
                     style={{backgroundColor: "#ecebeb", overflowY: "auto", maxHeight: maxHeight}}>
                    <JobDescription
                        jobId={selectedJob ? selectedJob.j_id : ''}
                        jobTitle={selectedJob ? selectedJob.j_title : ''}
                        companyName={selectedJob ? selectedJob.j_organization : ''}
                        location={selectedJob ? selectedJob.j_location : ''}
                        skills={selectedJob ? selectedJob.j_skills : ''}
                        jobTimestamp={selectedJob ? selectedJob.j_timestamp : ''}
                        employmentType={selectedJob ? selectedJob.j_type : ''}
                        jobDescription={selectedJob ? selectedJob.j_desc : ''}
                        companyLogo={selectedJob ? selectedJob.companyLogo : ''}
                        companyAbout={selectedJob ? selectedJob.about : ''}
                        hiringManagerPhoto={selectedJob ? hiringManagerPhoto : ''}
                        hiringManagerName={selectedJob ? hiringManagerName : ''}
                        hiringManagerPosition={selectedJob ? hiringManagerPosition : ''}
                        companyFollowers={selectedJob ? selectedJob.companyFollowers : ''}
                        dueDateApply={selectedJob ? selectedJob.due_date_apply : ''}
                    />
                </Col>
            </Row>
        </Container>
    );
}
export default Jobs