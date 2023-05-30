import React, {useState} from "react";
import {Badge, Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faEnvelope, faPaperPlane, faPlus, faSave} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import ApplyJobModal1 from "./modals/ApplyJobModal1";
import ApplyJobModal2 from "./modals/ApplyJobModal2";
import ApplyJobModal3 from "./modals/ApplyJobModal3";
import ApplyJobModal4 from "./modals/ApplyJobModal4";
import ApplyJobModal5 from "./modals/ApplyJobModal5";
import ApplyJobModal6 from "./modals/ApplyJobModal6";


const JobDescription = (props) => {
    const {
        position,
        company,
        companyLocation,
        jobLocation,
        postingDate,
        jobType,
        aboutJob,
        aboutHiringManager,
        aboutCompany,
        companyLogo
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
                            <h2>{position}</h2>
                            <div className={"mb-2"}>{company} - {companyLocation}</div>
                            <Row>
                                <Col>
                                    <div>Job Type: <Badge bg="secondary">{jobType}</Badge></div>
                                </Col>
                                <Col>
                                    <div>Job Location: <Badge bg="info">Remote</Badge></div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                <Col className="text-end me-2">
                    <div className={"fw-bold text-decoration-underline"}>Posting Date</div>
                    <div>{postingDate}</div>
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
                    <p><span className={"fw-bold"}>Reporting and Analytics Services, Data Analyst</span>
                        <br />
                        <span className={"fw-bold"}>Job Description:</span>
                        <br />
                        The Sony spirit is about freedom, no limits, empowerment, innovation, imagination, autonomy,
                        creativity and choice. With business operations all over the globe, we provide high quality
                        lifestyle products offering entertainment through technology.
                        <br />
                        Global Business Services (GBS) provides services to Sony, globally, in a wide range of areas
                        ranging from Online Marketing to Project Management. We work in a dynamic and interactive
                        environment in our headquarter based in Istanbul. We are driven by our customers, supporting
                        them with our core values of professionalism, passion, creativity and proactivity.
                        <br />

                        We are looking for a Reporting and Analytics Services, Senior Data Analyst to join us at an
                        exciting time of growth within our Management Consulting team. Working cross functionally, you
                        will be responsible for using statistics and computation in order to interpret data for the
                        purpose of decision making.
                        <br />
                        <br />
                        Reporting to the <span
                            className={"fw-bold"}>GBS – Reporting and Analytics Services Manager</span>

                        <br />
                        <span className={"fw-bold"}>Day-to-day operations include</span>
                        <ul>
                            <li>Performs data analysis required to troubleshoot data related issues and works directly
                                with business in the resolution of data issues.
                            </li>
                            <li>Collaborates with analytics and business teams to improve data models that feed
                                business BI tools, increasing data accessibility and monitor data quality across the
                                organization.
                            </li>
                            <li>Design and implement reports into BI tools to improve client experience with data
                            </li>
                            <li>Participate in process improvement projects: optimize existing tables/ views/ data to
                                reduce processing times and increase data quality
                            </li>
                            <li>Prepare monthly and quarterly reports, dashboards, illustrating data graphically
                            </li>
                            <li>Keep up-to-date with latest technology trends
                            </li>
                            <li>It’s required to have business trip to abroad when necessary. (around %10-15)
                            </li>
                            <li>The location to work is the Istanbul office of Sony Europe Ltd.
                            </li>
                        </ul>


                        <span className={"fw-bold"}>Qualifications:</span>
                        <br />
                        Ideal candidate should have:
                        <br />
                        <ul>
                            <li>Bachelor’s Degree in Computer Science, Economics, Statistics, Engineering, or a related
                                technical discipline, and PHD in data science is highly preferred.
                            </li>
                            <li>3-4 years of practical experience in analytical processes and statistical analysis
                            </li>
                            <li>Excellent MS Office, reporting skills, and have a good understanding of macros in Excel
                            </li>
                            <li>Profound knowledge of practical experience with Python programming
                            </li>
                            <li>Solid Experience working with Microsoft technologies e.g. MS SQL server, MS Power BI
                            </li>
                            <li>Some experience with schema design and dimensional data modeling
                            </li>
                            <li>Able to work collaboratively in a multicultural and international business environment
                            </li>
                            <li>Fluency in both written and spoken English</li>
                        </ul>
                    </p>
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
            <ApplyJobModal2 currentModal={currentModal} handleCloseModal={handleCloseModal} handleApplyClick={() => handleApplyClick(2)} />
            <ApplyJobModal3 currentModal={currentModal} handleCloseModal={handleCloseModal} handleApplyClick={() => handleApplyClick(3)} />
            <ApplyJobModal4 currentModal={currentModal} handleCloseModal={handleCloseModal} handleApplyClick={() => handleApplyClick(4)} />
            <ApplyJobModal5 currentModal={currentModal} handleCloseModal={handleCloseModal} handleApplyClick={() => handleApplyClick(5)} />
            <ApplyJobModal6 currentModal={currentModal} handleCloseModal={handleCloseModal} />
        </div>
    );
};

export default JobDescription