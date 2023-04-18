import React, {useState} from 'react';
import {Row, Col, Image, Badge, Modal, Button, Container, Card} from 'react-bootstrap';
import CareerExpertNavBar from "../components/CareerExpertNavBar";

function ApplicantSubtag({subtag}) {
    return (
        <Badge className="mb-2" bg="secondary">
            {subtag}
        </Badge>
    );
}

function ApplicationCard({ application, handleClick }) {
    const {name, date, tag, subTags, photo} = application;
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    <Image src={photo} rounded fluid className="mb-3"/>
                    <div className="fw-bold">{name}</div>
                    <div className="text-muted">{date}</div>
                    <hr/>
                    <div className="fw-bold">{tag}:</div>
                    {subTags.map((subtag) => (
                        <ApplicantSubtag key={subtag} subtag={subtag}/>
                    ))}
                    <hr/>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu quam vel massa imperdiet
                        iaculis. Donec
                        consequat ipsum vel tellus eleifend porttitor. Nullam quis lectus ex. Vestibulum dignissim est
                        vitae libero
                        laoreet, quis imperdiet magna blandit. Vestibulum ante ipsum primis in faucibus orci luctus et
                        ultrices
                        posuere cubilia curae; Proin bibendum, metus ac posuere eleifend, eros orci feugiat dolor, vel
                        tincidunt
                        quam erat eget velit.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
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
            tag: "Internship",
            subTags: ["Marketing", "Sales"],
            photo: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
            id: 2,
            name: "Jane Doe",
            date: "2022-02-12",
            tag: "Full-time",
            subTags: ["Engineering"],
            photo: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        {
            id: 3,
            name: "Bob Smith",
            date: "2022-02-10",
            tag: "Internship",
            subTags: ["Finance"],
            photo: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        {
            id: 4,
            name: "Alice Johnson",
            date: "2022-02-09",
            tag: "Part-time",
            subTags: ["Design", "UI/UX"],
            photo: "https://randomuser.me/api/portraits/women/4.jpg",
        },
        {
            id: 5,
            name: "Michael Brown",
            date: "2022-02-08",
            tag: "Full-time",
            subTags: ["Engineering"],
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
