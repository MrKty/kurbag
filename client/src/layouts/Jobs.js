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
    faCheck
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import React, {useState} from "react";
import NavBar from "../components/NavBar";

const JobListing = ({position, company, location, image, description}) => (
    <Row className="border-bottom p-2" style={{backgroundColor: company === "Sony" ? "white" : "#ecebeb"}}>
        <Col md={3}>
            <Image src={image} fluid rounded/>
        </Col>
        <Col md={9}>
            <h5>{position}</h5>
            <p className="mb-1">{company}</p>
            <p className="mb-0">{location}</p>
        </Col>
    </Row>
);

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
                        <Col>
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
                <Col className="text-end">
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
                    <Button variant="success" onClick={() => handleApplyClick(0)}>
                        <FontAwesomeIcon icon={faCheck} className={"px-2"}/>
                        Applied
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
    )
        ;
};

const data = [
    {
        position: 'Data Analyst',
        company: 'Nokia',
        location: 'Istanbul, Turkey (remote)',
        image: 'https://media.licdn.com/dms/image/C4E0BAQGL8hpduEqGKQ/company-logo_100_100/0/1677420438777?e=1689811200&v=beta&t=uq7I20tbAw4q7rAxupek6VeDqkMf_0FUr2sKi-elvTw',
    },
    {
        position: 'Data Analyst',
        company: 'Sony',
        location: 'Istanbul, Turkey (remote)',
        image: 'https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ',
    },
    {
        position: 'SQL Developer',
        company: 'IBM',
        location: 'New York, NY (remote)',
        image: "data:image/png;base64,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"
    },

    {
        position: 'Database Administrator',
        company: 'Microsoft',
        location: 'Seattle, WA (remote)',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAOVBMVEXxURuAzCgAre/7vAn////xTxeCzTCFzjjxVifxWjAksO/7viYZru/7vRvxTRLxVCPyXziIzj/7vzAS7Np6AAABD0lEQVR4nO3P2xGCUBAFwVXBtyLkH6yf3giOtdqTwFRXpZrP06fjLlYMSEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhI2FE4p3ouXxJeYr0G4XqKVdOvR9g/wv4R9o+wf4T9q2uuYbvdYtU+1n0QPg6xCAkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCf9Z+Abf/3bA/sfZagAAAABJRU5ErkJggg==',
    },

    {
        position: 'Data Engineer',
        company: 'Amazon',
        location: 'San Francisco, CA (remote)',
        image: 'data:image/png;base64,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',
    }
    // more data objects here...
];

const Jobs = () => (
    <Container fluid>
        <NavBar handleClick={null}/>
        <Row>
            <Col className="col-3 mt-3 me-2">
                <Card className={"border p-2"}>
                    <Row>
                        <Col className={"col-9"}>
                            <h4>Saved Jobs</h4>
                        </Col>
                        <Col>
                            <FontAwesomeIcon icon={faAngleUp} className={"px-2"}/>
                        </Col>
                    </Row>
                    <Row>
                        <Col className={"col-9"}>
                            <h4>Applied Jobs</h4>
                        </Col>
                        <Col>
                            <FontAwesomeIcon icon={faAngleDown} className={"px-2"}/>
                        </Col>
                    </Row>
                    <Row className="border-bottom p-2">
                        <Col md={3}>
                            <img
                                src="https://static.vecteezy.com/system/resources/previews/009/469/630/non_2x/google-logo-isolated-editorial-icon-free-vector.jpg"
                                alt="Profile"
                                className="rounded"
                                width="75"
                                height="75"
                            />
                        </Col>
                        <Col md={9}>
                            <Row><h5>Web Developer</h5></Row>
                            <Row>
                                <Col>
                                    <p className="mt-2 me-auto fw-bold">Google</p>
                                </Col>
                                <Col>
                                    <button className={"btn btn-info fw-bold"} style={{color: "white"}}>Pending</button>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={3}>
                            <img
                                src="https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ"
                                alt="Profile"
                                className="rounded"
                                width="75"
                                height="75"
                            />
                        </Col>
                        <Col md={9}>
                            <Row><h5>Data Analyst</h5></Row>
                            <Row>
                                <Col>
                                    <p className="mt-2 me-auto fw-bold">Sony</p>
                                </Col>
                                <Col>
                                    <button className={"btn btn-info fw-bold"} style={{color: "white"}}>Pending</button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col className="col-3 mt-3" style={{backgroundColor: "#ecebeb"}}>
                {data.map(job => (
                    <JobListing
                        key={job.position}
                        position={job.position}
                        company={job.company}
                        location={job.location}
                        image={job.image}
                    />
                ))}
            </Col>
            <Col className="col-5 mt-3 p-2" style={{backgroundColor: "#ecebeb"}}>
                <JobDescription
                    position="Data Analyst"
                    company="Sony"
                    companyLocation="Istanbul, Turkey"
                    jobLocation="Remote"
                    postingDate="April 19, 2023"
                    jobType="Full-time"
                    aboutJob="We are seeking a highly analytical Data Analyst to join our team. You will be responsible for analyzing large data sets and providing insights to help guide business decisions."
                    aboutHiringManager="The hiring manager for this position is John Smith. He has been with the company for 5 years and is excited to welcome a new member to the team."
                    aboutCompany="Sony is a leading gaming company that creates innovative and engaging games for players around the world. We are passionate about what we do and are always looking for talented individuals to join our team."
                    companyLogo="https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ"
                />
            </Col>
        </Row>
    </Container>
);

export default Jobs