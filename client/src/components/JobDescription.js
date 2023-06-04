import React, {useEffect, useState} from "react";
import {Badge, Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faEnvelope, faPaperPlane, faPlus, faSave} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import ApplyJobModal1 from "./modals/ApplyJobModal1";
import sendRequest from "../utils/request";


const JobDescription = (props) => {
    const {
        jobId,
        jobTitle,
        companyName,
        location,
        employmentType,
        skills,
        jobDescription,
        companyLogo,
        companyAbout,
        companyFollowers,
        dueDateApply,
        hiringManagerId,
        hiringManagerPhoto,
        hiringManagerName,
        hiringManagerPosition,
        jobTimestamp
    } = props;

    const [currentModal, setCurrentModal] = useState(null);

    // Check if skills are available
    if (!skills) {
        return <div>Loading...</div>; // or render a placeholder component
    }

    const skillArray = skills.split(",");


    const handleApplyClick = (modalIndex) => {
        setCurrentModal(modalIndex);
    };

    const handleCloseModal = () => {
        setCurrentModal(null);
    };

    return (
        <div>
            <Row>
                <Col className={"col-9"}>
                    <Row className={"p-1"}>
                        <Col style={{overflowY: "auto"}}>
                            <h2>{jobTitle}</h2>
                            <div className={"mb-2"}>{companyName} - {location}</div>
                            <Row>
                                <Col>
                                    <div>Job Type: <Badge bg="secondary">{employmentType}</Badge></div>
                                </Col>
                                <Col>
                                    <div>Job Location: <Badge bg="info">{location}</Badge></div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col className="text-end me-2">
                    <div className={"fw-bold text-decoration-underline"}>Posting Date</div>
                    <div>{jobTimestamp}</div>
                </Col>
            </Row>
            <Row>
                <Row>
                    <h6 className={"mt-2 fw-bold text-decoration-underline"}>Required Skills</h6>
                </Row>
                <Row>
                    <Col>
                        {skillArray.map((skill, index) => (
                            <Badge key={index} bg="secondary" className={"me-2"}>
                                {skill.trim()}
                            </Badge>
                        ))}
                    </Col>
                </Row>
            </Row>
            <Row className={"py-2"}>
                <Col className={"col-2"}>
                    <Button variant="primary" onClick={() => handleApplyClick(0)}>
                        <FontAwesomeIcon icon={faPaperPlane} className={"px-2"}/>
                        Apply
                    </Button>
                </Col>
                <Col className={"col-2"}>
                    <Button variant="success">
                        <FontAwesomeIcon icon={faSave} className={"px-2"}/>
                        Save
                    </Button>
                </Col>
            </Row>
            <hr/>
            <Row>
                <Col>
                    <Card className={"p-3"}>
                        <h4>About the Hiring Manager</h4>
                        <hr/>
                        <Row className="align-items-center">
                            <Col xs={1} className={"me-2"}>
                                <img
                                    src={hiringManagerPhoto}
                                    alt="Profile"
                                    className="rounded-circle"
                                    width="50"
                                    height="50"
                                />
                            </Col>
                            <Col xs={8}>
                                <Link to={"/profile/" + hiringManagerId} className={"text-start no-underline fw-bold"}>{hiringManagerName}</Link>
                                <div className={"text-start fw-bold"}>{hiringManagerPosition} at {companyName}
                                </div>
                            </Col>
                            <Col xs={2} className={"text-end"}>
                                <button className="btn btn-primary">
                                    <FontAwesomeIcon icon={faEnvelope} className="me-2"/>
                                    Send Message
                                </button>
                            </Col>
                        </Row>
                    </Card>

                </Col>
            </Row>
            <Row>
                <Col className={"p-3"}>
                    <h4>About the Job</h4>
                    {jobDescription}
                </Col>
            </Row>
            <Row>
                <Col>
                    <Card className={"p-3"}>
                        <h4>About the Company</h4>
                        <hr/>
                        <Row className="align-items-center">
                            <Col className={"col-1 me-2"}>
                                <img
                                    src={companyLogo}
                                    alt="Profile"
                                    className="rounded"
                                    width="50"
                                    height="50"
                                />
                            </Col>
                            <Col className={"col-7"}>
                                <Link to={"#"} className={"text-start no-underline fw-bold"}>{companyName}</Link>
                                <div className={"text-start fw-bold"}>{companyFollowers}</div>
                            </Col>
                            <Col className={"text-end col-3"}>
                                <button className="btn btn-primary">
                                    <FontAwesomeIcon icon={faAdd} className="me-2"/>
                                    Follow
                                </button>
                            </Col>
                        </Row>
                        <hr/>
                        <div>{companyAbout}
                        </div>
                    </Card>
                </Col>
            </Row>
            <ApplyJobModal1 currentModal={currentModal} handleCloseModal={handleCloseModal}
                            handleApplyClick={() => handleApplyClick(1)} jobId={jobId}/>
        </div>
    );
};

export default JobDescription