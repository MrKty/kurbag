import React, {useState} from "react";
import {Badge, Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAdd, faEnvelope, faPaperPlane, faPlus, faSave} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

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
                        <Col style={{overflowY:"auto"}}>
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
                                    src="https://randomuser.me/api/portraits/women/2.jpg"
                                    alt="Profile"
                                    className="rounded-circle"
                                    width="50"
                                    height="50"
                                />
                            </Col>
                            <Col xs={8}>
                                <Link to={"#"} className={"text-start no-underline fw-bold"}>Jane Smith</Link>
                                <div className={"text-start fw-bold"}>HR Assistant Specialist | IT
                                    Recruitment at Sony
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
                    <p><span className={"fw-bold"}>Reporting and Analytics Services, Data Analyst</span>
                        <br/>
                        <span className={"fw-bold"}>Job Description:</span>
                        <br/>
                        The Sony spirit is about freedom, no limits, empowerment, innovation, imagination, autonomy,
                        creativity and choice. With business operations all over the globe, we provide high quality
                        lifestyle products offering entertainment through technology.
                        <br/>
                        Global Business Services (GBS) provides services to Sony, globally, in a wide range of areas
                        ranging from Online Marketing to Project Management. We work in a dynamic and interactive
                        environment in our headquarter based in Istanbul. We are driven by our customers, supporting
                        them by with our core values of professionalism, passion, creativity and proactivity.
                        <br/>

                        We are looking for a Reporting and Analytics Services, Senior Data Analyst to join us at an
                        exciting time of growth within our Management Consulting team. Working cross functionally, you
                        will be responsible of using statistics and computation in order to interpret data for the
                        purpose of decision making.
                        <br/>
                        <br/>
                        Reporting to the <span
                            className={"fw-bold"}>GBS – Reporting and Analytics Services Manager</span>

                        <br/>
                        <span className={"fw-bold"}>Day-to-day operations include</span>
                        <ul>
                            <li> Performs data analysis required to troubleshoot data related issues and works directly
                                with business in the resolution of data issues.
                            </li>
                            <li> Collaborates with analytics and business teams to improve data models that feed
                                business BI tools, increasing data accessibility and monitor data quality across the
                                organization.
                            </li>
                            <li> Design and implement reports into BI tools to improve client experience with data
                            </li>
                            <li> Participate in process improvement projects: optimize existing tables/ views/ data to
                                reduce processing times and increase data quality
                            </li>
                            <li> Prepare monthly and quarterly reports, dashboards, illustrating data graphically
                            </li>
                            <li> Keep up-to-date with latest technology trends
                            </li>
                            <li> It’s required to have business trip to abroad when necessary. (around %10-15)
                            </li>
                            <li> The location to work is the Istanbul office of Sony Europe Ltd.
                            </li>
                        </ul>


                        <span className={"fw-bold"}>Qualifications:</span>
                        <br/>
                        Ideal candidate should have:
                        <br/>
                        <ul>
                            <li> Bachelor’s Degree in Computer Science, Economics, Statistics, Engineering or a related
                                technical discipline, and PHD in data science is highly preferred.
                            </li>
                            <li> 3-4 years of practical experience in analytical processes and statistical analysis
                            </li>
                            <li> Excellent MS Office, reporting skills and have good understanding of macros in Excel
                            </li>
                            <li> Profound knowledge of practical experience with Python programming
                            </li>
                            <li> Solid Experience working with Microsoft technologies e.g. MS SQL server, MS Power BI
                            </li>
                            <li> Some experience with schema design and dimensional data modeling
                            </li>
                            <li> Able to work collaboratively in multicultural and international business environment
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
                        <hr/>
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
                                    <FontAwesomeIcon icon={faAdd} className="me-2"/>
                                    Follow
                                </button>
                            </Col>
                        </Row>
                        <hr/>
                        <div>Sony’s purpose is simple. We aim to fill the world with emotion, through the power of
                            creativity and technology. We want to be responsible for getting hearts racing, stirring
                            ambition, and putting a smile on the faces of our customers. That challenge,
                            …show more
                        </div>
                    </Card>
                </Col>
            </Row>

            <Modal show={currentModal === 0} onHide={handleCloseModal} className={"modal-lg"}>
                <Modal.Header closeButton>
                    <Modal.Title>Apply to Sony</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row><h5>Contact Info:</h5></Row>
                    <div className="d-flex align-items-center mb-3">
                        <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile photo"
                             className="rounded-circle me-3" style={{width: "100px"}}/>
                        <Row>
                            <Row className={"my-2"}>
                                <Col className={"col-4 align-self-center visually-hidden"}>First name:</Col>
                                <Col><input type="text" className="form-control" placeholder="Enter first name"/></Col>
                            </Row>
                            <Row>
                                <Col className={"col-4 visually-hidden"}>Last name:</Col>
                                <Col><input type="text" className="form-control" placeholder="Enter last name"/></Col>
                            </Row>
                        </Row>
                    </div>
                    <div>
                        <div>Phone:</div>
                        <div className="d-flex align-items-center mb-2">
                            <input type="text" className="form-control" placeholder="Enter Mobile Phone Number"/>
                        </div>
                        <div>Email:</div>
                        <input type="email" className="form-control mb-2" placeholder="Enter Email Address"/>
                        <div>Summary:</div>
                        <textarea className="form-control mb-2" style={{resize: "none"}}
                                  placeholder="Enter About Yourself"/>
                        <div>Headline:</div>
                        <input type="text" className="form-control" placeholder="Enter Headline"/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleCloseModal();
                        handleApplyClick(1);
                    }}>Next</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={currentModal === 1} onHide={handleCloseModal} className={"modal-lg"}>
                <Modal.Header closeButton>
                    <Modal.Title>Apply to Sony</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row><h5>Home Address:</h5></Row>
                    <div className="mb-3">
                        <label htmlFor="streetAddressLine1" className="form-label">
                            Street Address Line 1
                        </label>
                        <input type="text" className="form-control" id="streetAddressLine1"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="streetAddressLine2" className="form-label">
                            Street Address Line 2
                        </label>
                        <input type="text" className="form-control" id="streetAddressLine2"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">
                            City
                        </label>
                        <input type="text" className="form-control" id="city"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="zipCode" className="form-label">
                            ZIP / Postal Code
                        </label>
                        <input type="text" className="form-control" id="zipCode"/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="secondary"
                        onClick={() => {
                            handleCloseModal();
                            handleApplyClick(0);
                        }}
                    >
                        Back
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => {
                            handleCloseModal();
                            handleApplyClick(2);
                        }}
                    >
                        Next
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={currentModal === 2} onHide={handleCloseModal} className={"modal-lg"}>
                <Modal.Header closeButton>
                    <Modal.Title>Apply to Sony</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row><h5>Resume:</h5></Row>
                    <div className="mb-3">
                        <label htmlFor="resume" className="btn btn-outline-primary fw-bold rounded-5">Upload
                            Resume</label>
                        <input type="file" className="form-control visually-hidden" id="resume"/>
                        <small className={"d-block text-muted"}>DOC, DOCX, PDF (2 MB)</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="coverLetter" className="form-label">Cover Letter</label>
                        <textarea className="form-control" id="coverLetter" rows="5"></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="coverLetter" className="form-label">Add Your Skills</label><br/>
                        <Badge bg="primary" className={"me-2"}>SQL</Badge>
                        <Badge bg="primary">DBMS</Badge>
                        <Row>
                            <Col className={"col-3 py-1"}>
                                <input type={"text"}     className={"d-block my-2 p-1"} placeholder={"Write new skill"}/>
                            </Col>
                            <Col className={"p-2 m-1"}>
                                <button className={"btn btn-primary"}>Add</button>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleCloseModal()
                        handleApplyClick(1)
                    }}>
                        Back
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleCloseModal()
                        handleApplyClick(3)
                    }}>Next</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={currentModal === 3} onHide={handleCloseModal} className={"modal-lg"}>
                <Modal.Header closeButton>
                    <Modal.Title>Apply to Sony</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row><h5>Photo:</h5></Row>
                    <div className="mb-3">
                        <label htmlFor="photo" className="btn btn-outline-primary fw-bold rounded-5">Upload
                            Photo</label>
                        <input type="file" className="form-control visually-hidden" id="photo"/>
                        <small className={"d-block text-muted"}>JPEG, JPG, PNG (5 MB)</small>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => {
                        handleCloseModal()
                        handleApplyClick(2)
                    }}>
                        Back
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleCloseModal()
                        handleApplyClick(4)
                    }}>Next</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={currentModal === 4} onHide={handleCloseModal} className={"modal-lg"}>
                <Modal.Header closeButton>
                    <Modal.Title>Apply to Sony</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row><h5>Work Experience:</h5></Row>
                    <Card>
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
                    <Row>
                        <Col className={"text-muted col-10"}>1 of 1</Col>
                        <Col><Link to={"#"} className={"no-underline"}>Remove</Link></Col>
                        <Col><Link to={"#"} className={"no-underline"}>Edit</Link></Col>
                    </Row>
                    <Card className={"my-2"}>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="title" className={"my-2"}>
                                    <Form.Label>Your Title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Job Title"/>
                                </Form.Group>
                                <Form.Group controlId="company" className={"my-2"}>
                                    <Form.Label>Company</Form.Label>
                                    <Form.Control type="text" placeholder="Enter company name"/>
                                </Form.Group>
                                <Form.Group controlId="dates" className={"my-2"}>
                                    <Form.Label>Dates of Employment</Form.Label>
                                    <Col className={"my-2"}>
                                        <Form.Label>From</Form.Label>
                                        <Row>
                                            <Col className={"col-6"}>
                                                <Form.Select name="fromMonth" aria-label="Select month">
                                                    <option>Month</option>
                                                    <option>January</option>
                                                    <option>February</option>
                                                    <option>March</option>
                                                    <option>April</option>
                                                    <option>May</option>
                                                    <option>June</option>
                                                    <option>July</option>
                                                    <option>August</option>
                                                    <option>September</option>
                                                    <option>October</option>
                                                    <option>November</option>
                                                    <option>December</option>
                                                </Form.Select>
                                            </Col>
                                            <Col>
                                                <Form.Select name="fromYear" aria-label="Select year">
                                                    <option>Year</option>
                                                    <option>2022</option>
                                                    <option>2021</option>
                                                    <option>2020</option>
                                                    <option>2019</option>
                                                    <option>2018</option>
                                                    <option>2017</option>
                                                    <option>2016</option>
                                                    <option>2015</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className={"my-2"}>
                                        <Form.Label>To</Form.Label>
                                        <Row>
                                            <Col className={"col-6"}>
                                                <Form.Select name="toMonth" aria-label="Select month">
                                                    <option>Month</option>
                                                    <option>January</option>
                                                    <option>February</option>
                                                    <option>March</option>
                                                    <option>April</option>
                                                    <option>May</option>
                                                    <option>June</option>
                                                    <option>July</option>
                                                    <option>August</option>
                                                    <option>September</option>
                                                    <option>October</option>
                                                    <option>November</option>
                                                    <option>December</option>
                                                </Form.Select>
                                            </Col>
                                            <Col>
                                                <Form.Select name="toYear" aria-label="Select year">
                                                    <option>Year</option>
                                                    <option>2022</option>
                                                    <option>2021</option>
                                                    <option>2020</option>
                                                    <option>2019</option>
                                                    <option>2018</option>
                                                    <option>2017</option>
                                                    <option>2016</option>
                                                    <option>2015</option>
                                                </Form.Select>
                                            </Col>
                                            <Form.Check
                                                type="checkbox"
                                                id="currently-work-here"
                                                label="I currently work here"
                                                className={"m-3"}
                                            />
                                            <button className={"btn btn-outline-primary"}>Add</button>
                                        </Row>
                                    </Col>
                                </Form.Group>
                                <Form.Group controlId="industry" className={"my-2"}>
                                    <Form.Label>Industry</Form.Label>
                                    <Form.Control type="text" placeholder="Enter industry"/>
                                </Form.Group>
                                <Form.Group controlId="job-description" className={"my-2"}>
                                    <Form.Label>Job Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Enter job description"/>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                    <Row>
                        <Col style={{color: "blue"}}>
                            <FontAwesomeIcon icon={faPlus}/> Add more
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Back
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleCloseModal()
                        handleApplyClick(5)
                    }}>Next</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={currentModal === 5} onHide={handleCloseModal} className={"modal-lg"}>
                <Modal.Header closeButton>
                    <Modal.Title>Apply to Sony</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row><h5>Education:</h5></Row>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                School: <strong>Bilkent Üniversitesi</strong><br/>
                                Degree: <strong>Bachelor's Degree</strong><br/>
                                Major / Field of Study: <strong>Computer Science</strong><br/>
                                Dates attended: <strong>Sep 2019 - Jun 2024</strong>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Row>
                        <Col className={"text-muted col-10"}>1 of 2</Col>
                        <Col><Link to={"#"} className={"no-underline"}>Remove</Link></Col>
                        <Col><Link to={"#"} className={"no-underline"}>Edit</Link></Col>
                    </Row>
                    <Card>
                        <Card.Body>
                            <Card.Text>
                                School: <strong>Tofaş Fen Lisesi</strong><br/>
                                Degree: <strong>High School Diploma</strong><br/>
                                Major / Field of Study: <strong>Science</strong><br/>
                                Dates attended: <strong>Sep 2015 - Jun 2019</strong>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Row>
                        <Col className={"text-muted col-10"}>2 of 2</Col>
                        <Col><Link to={"#"} className={"no-underline"}>Remove</Link></Col>
                        <Col><Link to={"#"} className={"no-underline"}>Edit</Link></Col>
                    </Row>
                    <Card className={"my-2"}>
                        <Card.Body>
                            <Form>
                                <Form.Group controlId="school" className={"my-2"}>
                                    <Form.Label>School</Form.Label>
                                    <Form.Control type="text" placeholder="Enter School Name"/>
                                </Form.Group>
                                <Form.Group controlId="degree" className={"my-2"}>
                                    <Form.Label>Degree</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Degree"/>
                                </Form.Group>
                                <Form.Group controlId="field" className={"my-2"}>
                                    <Form.Label>Major / Field of Study</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Study Area"/>
                                </Form.Group>
                                <Form.Group controlId="dates" className={"my-2"}>
                                    <Form.Label>Dates Attended</Form.Label>
                                    <Col className={"my-2"}>
                                        <Form.Label>From</Form.Label>
                                        <Row>
                                            <Col className={"col-6"}>
                                                <Form.Select name="fromMonth" aria-label="Select month">
                                                    <option>Month</option>
                                                    <option>January</option>
                                                    <option>February</option>
                                                    <option>March</option>
                                                    <option>April</option>
                                                    <option>May</option>
                                                    <option>June</option>
                                                    <option>July</option>
                                                    <option>August</option>
                                                    <option>September</option>
                                                    <option>October</option>
                                                    <option>November</option>
                                                    <option>December</option>
                                                </Form.Select>
                                            </Col>
                                            <Col>
                                                <Form.Select name="fromYear" aria-label="Select year">
                                                    <option>Year</option>
                                                    <option>2022</option>
                                                    <option>2021</option>
                                                    <option>2020</option>
                                                    <option>2019</option>
                                                    <option>2018</option>
                                                    <option>2017</option>
                                                    <option>2016</option>
                                                    <option>2015</option>
                                                </Form.Select>
                                            </Col>
                                        </Row>
                                    </Col>
                                    <Col className={"my-2"}>
                                        <Form.Label>To</Form.Label>
                                        <Row>
                                            <Col className={"col-6"}>
                                                <Form.Select name="toMonth" aria-label="Select month">
                                                    <option>Month</option>
                                                    <option>January</option>
                                                    <option>February</option>
                                                    <option>March</option>
                                                    <option>April</option>
                                                    <option>May</option>
                                                    <option>June</option>
                                                    <option>July</option>
                                                    <option>August</option>
                                                    <option>September</option>
                                                    <option>October</option>
                                                    <option>November</option>
                                                    <option>December</option>
                                                </Form.Select>
                                            </Col>
                                            <Col>
                                                <Form.Select name="toYear" aria-label="Select year">
                                                    <option>Year</option>
                                                    <option>2022</option>
                                                    <option>2021</option>
                                                    <option>2020</option>
                                                    <option>2019</option>
                                                    <option>2018</option>
                                                    <option>2017</option>
                                                    <option>2016</option>
                                                    <option>2015</option>
                                                </Form.Select>
                                            </Col>
                                            <Form.Check
                                                type="checkbox"
                                                id="currently-work-here"
                                                label="I currently study here"
                                                className={"m-3"}
                                            />
                                            <button className={"btn btn-outline-primary"}>Add</button>
                                        </Row>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Back
                    </Button>
                    <Button variant="primary" onClick={() => {
                        handleCloseModal()
                    }}>Submit Application</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default JobDescription