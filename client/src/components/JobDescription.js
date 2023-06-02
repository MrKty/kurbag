import React, {useState} from "react";
import {Badge, Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faEnvelope, faPaperPlane, faPlus, faSave} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import ApplyJobModal1 from "./modals/ApplyJobModal1";


const JobDescription = (props) => {
    const {
        jobId,
        jobTitle,
        companyName,
        location,
        employmentType,
        jobDescription,
        companyLogo,
        companyFollowers,
        dueDateApply,
        jobTimestamp
    } = props;

    const [currentModal, setCurrentModal] = useState(null);

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
                        <Col style={{ overflowY: "auto" }}>
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
                        <Badge bg="secondary" className={"me-2"}>Python</Badge>
                        <Badge bg="secondary" className={"me-2"}>R</Badge>
                        <Badge bg="secondary" className={"me-2"}>SQL</Badge>
                        <Badge bg="secondary" className={"me-2"}>Data Security</Badge>
                        <Badge bg="secondary" className={"me-2"}>Statistical Analysis</Badge>
                    </Col>
                </Row>
            </Row>
            <Row className={"py-2"}>
                <Col className={"col-2"}>
                    <Button variant="primary" onClick={() => handleApplyClick(0)}>
                        <FontAwesomeIcon icon={faPaperPlane} className={"px-2"} />
                        Apply
                    </Button>
                </Col>
                <Col className={"col-2"}>
                    <Button variant="success">
                        <FontAwesomeIcon icon={faSave} className={"px-2"} />
                        Save
                    </Button>
                </Col>
            </Row>
            <hr />
            <Row>
                <Col>
                    <Card className={"p-3"}>
                        <h4>About the Hiring Manager</h4>
                        <hr />
                        <Row className="align-items-center">
                            <Col xs={1} className={"me-2"}>
                                <img
                                    src="https://randomuser.me/api/portraits/women/2.jpg"
                                    alt="Profile"
                                    className="rounded-circle"
                                    width="50"
                                    height="50"
                                />
                            </Col>
                            <Col xs={8}>
                                <Link to={"#"} className={"text-start no-underline fw-bold"}>Jane Smith</Link>
                                <div className={"text-start fw-bold"}>HR Assistant Specialist | IT Recruitment at Sony</div>
                            </Col>
                            <Col xs={2} className={"text-end"}>
                                <button className="btn btn-primary">
                                    <FontAwesomeIcon icon={faEnvelope} className="me-2" />
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
                        <hr />
                        <Row className="align-items-center">
                            <Col className={"col-1 me-2"}>
                                <img
                                    src="https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ"
                                    alt="Profile"
                                    className="rounded"
                                    width="50"
                                    height="50"
                                />
                            </Col>
                            <Col className={"col-7"}>
                                <Link to={"#"} className={"text-start no-underline fw-bold"}>Sony</Link>
                                <div className={"text-start fw-bold"}>1,097,845 followers</div>
                            </Col>
                            <Col className={"text-end col-3"}>
                                <button className="btn btn-primary">
                                    <FontAwesomeIcon icon={faAdd} className="me-2" />
                                    Follow
                                </button>
                            </Col>
                        </Row>
                        <hr />
                        <div>Sony’s purpose is simple. We aim to fill the world with emotion, through the power of
                            creativity and technology. We want to be responsible for getting hearts racing, stirring
                            ambition, and putting a smile on the faces of our customers. That challenge,
                            …show more
                        </div>
                    </Card>
                </Col>
            </Row>
            <ApplyJobModal1 currentModal={currentModal} handleCloseModal={handleCloseModal} handleApplyClick={() => handleApplyClick(1)} />
        </div>
    );
};

export default JobDescription