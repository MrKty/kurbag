import React, {useState} from 'react';
import {Row, Col, Image, Badge, Modal, Button, Container, Card, Form} from 'react-bootstrap';
import CareerExpertNavBar from "../components/CareerExpertNavBar";

function ApplicantSubtag({subtag}) {
    return (
        <Badge className="mb-2 me-2" bg="secondary">
            {subtag}
        </Badge>
    );
}

function ApplicationCard({application, handleClick}) {
    const {name, date, tag, subTags, photo} = application;
    const [show, setShow] = useState(false);
    const [selectedCertificates, setSelectedCertificates] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCertificateSelect = (event) => {
        setSelectedCertificates([...selectedCertificates, event.target.files[0]]);
    };

    return (
        <>
            <Card className="my-2" onClick={handleShow} style={{cursor: 'pointer'}}>
                <Row>
                    <Col md={3}>
                        <Image src={photo} rounded fluid/>
                    </Col>
                    <Col md={2} className={'center-wrapper'}>
                        <div className="fw-bold">{name}</div>
                        <div className="text-muted">{date}</div>
                    </Col>
                    <Col md={5} className={'center-wrapper'}>
                        <Badge bg="primary" className="mb-2">
                            {tag}
                        </Badge>
                        {subTags.map((subtag) => (
                            <ApplicantSubtag key={subtag} subtag={subtag}/>
                        ))}
                    </Col>
                </Row>

            </Card>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Application Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Image src={photo} rounded fluid className="mb-3"/>
                        </Col>
                        <Col>
                            <div className="fw-bold">Applicant Name:</div>
                            <div className="fw-bold">Application Date:</div>
                        </Col>
                        <Col>
                            <a href={"#"} className={"no-underline"}>{name}</a>
                            <div className="">{date}</div>
                        </Col>
                    </Row>
                    <hr/>
                    <div><span className={"fw-bold"}>Main Expertise Area:</span> {tag}</div>
                    <div className={"fw-bold"}>Sub Expertise Areas:</div>
                    {subTags.map((subtag) => (
                        <ApplicantSubtag key={subtag} subtag={subtag}/>
                    ))}
                    <hr/>
                    <label htmlFor={"motivation"} className={"fw-bold"}>Motivation:</label>
                    <Row className="">
                        <div
                            id="motivation"
                            className="border border-dark rounded col-12 mx-auto p-1"
                            contentEditable="true"
                            style={{minHeight: '6em'}}
                        />
                    </Row>
                    <Form.Group>
                        <Form.Label>Certificates:</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleCertificateSelect} multiple className="mb-3" />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={handleClose} className={"fw-bold w-100"}>
                        Approve
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function CareerExpertApplications() {
    const [selectedApplication, setSelectedApplication] = useState(null);

    const applications = [
        {
            id: 1,
            name: "John Doe",
            date: "2022-02-14",
            tag: "Career",
            subTags: ["Remote Work", "Internships"],
            photo: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
            id: 2,
            name: "Jane Doe",
            date: "2022-02-12",
            tag: "Career",
            subTags: ["Freelancer", "Retirement"],
            photo: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        {
            id: 3,
            name: "Bob Smith",
            date: "2022-02-10",
            tag: "Career",
            subTags: ["Internships"],
            photo: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        {
            id: 4,
            name: "Alice Johnson",
            date: "2022-02-09",
            tag: "Career",
            subTags: ["Remote Work", "Internships"],
            photo: "https://randomuser.me/api/portraits/women/4.jpg",
        },
        {
            id: 5,
            name: "Michael Brown",
            date: "2022-02-08",
            tag: "Career",
            subTags: ["Retirement", "Freelancer"],
            photo: "https://randomuser.me/api/portraits/men/5.jpg",
        },
    ];

    const handleApplicationClick = (application) => {
        setSelectedApplication(application);
    };

    const handleClosePopup = () => {
        setSelectedApplication(null);
    };

    return (
        <Container fluid>
            <CareerExpertNavBar underlined={'/career-expert/approve-applications'}/>
            <div className="center-wrapper">
                {applications.map((application) => (
                    <Col key={application.id} md={8}>
                        <ApplicationCard
                            application={application}
                            handleClick={handleApplicationClick}
                        />
                    </Col>
                ))}
            </div>

            {selectedApplication && (
                <div className="popup" onClick={handleClosePopup}>
                    <div className="popup-content">
                        <h2>{selectedApplication.applicantName}</h2>
                        <p>
                            Applied on: {selectedApplication.applicationDate} for{" "}
                            {selectedApplication.appliedTag}
                        </p>
                        <p>Sub-tags:</p>
                        <ul>
                            {selectedApplication.subTags.map((subTag) => (
                                <li key={subTag} className="sub-tag">
                                    {subTag}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </Container>
    );
}

export default CareerExpertApplications;
