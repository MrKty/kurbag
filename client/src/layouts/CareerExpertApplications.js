import React, {useEffect, useState} from 'react';
import {Row, Col, Image, Badge, Modal, Button, Container, Card, Form} from 'react-bootstrap';
import CareerExpertNavBar from "../components/CareerExpertNavBar";
import FilterBar from "../components/FilterBar";
import sendRequest from "../utils/request";

function ApplicationCard({application, handleClick}) {
    const {appID, name, date, tag, photo} = application;
    const [files, setFiles] = useState([]);
    const [show, setShow] = useState(false);
    const [motivationText, setMotivationText] = useState("dasdsad")

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (show) {
            // Fetch applications data from the Flask backend
            sendRequest('get-specific-c-e-application', 'POST', {appID}, (data) => {
                console.log("here")
                console.log(data)
                if (data.motivation) {
                    setMotivationText(data.motivation)
                }
                if (data.certificates) {
                    setFiles(data.certificates)
                }
            });
        }
    }, [show]);


    function approveApplication() {

        // Fetch applications data from the Flask backend
        sendRequest('approve-c-e-application', 'POST', {appID}, (data) => {
            console.log("here")
            console.log(data)
            alert(data.message)
            handleClose()
        });
    }


    return (
        <>
            <Card className="my-2" onClick={handleShow}
                  style={{cursor: 'pointer'}}>
                <Row>
                    <Col md={3} style={{maxWidth: '150px'}}>
                        <Image src={photo} rounded className={"img-fluid"}/>
                    </Col>
                    <Col md={2} className={'center-wrapper'}>
                        <div className="fw-bold">{name}</div>
                        <div className="text-muted">{date}</div>
                    </Col>
                    <Col md={5} className={'center-wrapper'}>
                        <Badge bg="primary" className="mb-2">
                            {tag}
                        </Badge>
                    </Col>
                </Row>

            </Card>
            <Modal show={show} onHide={handleClose} className={"modal-xl"}>
                <Modal.Header closeButton>
                    <Modal.Title>Application Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col style={{maxWidth: '150px'}}>
                            <Image src={photo} rounded fluid className="mb-1"/>
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
                    <div><span className={"fw-bold"}>Applied Expertise Area:</span> {tag}</div>
                    <hr/>
                    <label htmlFor={"motivation"} className={"fw-bold"}>Motivation:</label>
                    <Row className="">
                        <div
                            id="motivation"
                            className="border border-dark rounded col-12 mx-auto p-1"
                            contentEditable="true"
                            style={{minHeight: '6em'}}>
                            {motivationText}
                        </div>
                    </Row>
                    <Form.Group>
                        <Form.Label className={"visually-hidden"}>Certificates:</Form.Label>
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Certificates</th>
                            </tr>
                            </thead>
                            <tbody>
                            {files.map((file) => (
                                <tr key={file.id}>
                                    <td>{file.name}</td>
                                    <td>
                                        <a href={file.url} download>
                                            Download
                                        </a>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="success" onClick={approveApplication} className={"fw-bold w-100"}>
                            Approve
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    );
}

function CareerExpertApplications() {
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [applications, setApplications] = useState([]);

    useEffect(() => {
        // Fetch applications data from the Flask backend
        sendRequest('career-expert-applications', 'POST', {}, (data) => {
            console.log("here")
            if (data.applications) {
                console.log(data.applications)
                setApplications(data.applications);
            }
        });
    }, [selectedApplication]);

    const handleApplicationClick = (application) => {
        setSelectedApplication(application);
    };

    const handleClosePopup = () => {
        setSelectedApplication(null);
    };

    return (
        <Container fluid>
            <CareerExpertNavBar activeLink="approve-applications"/>
            <FilterBar filters={["Date", "Main Tag"]}/>
            <div className="center-wrapper">
                {applications.map((application) => (
                    <Col key={application.appID} md={8}>
                        <ApplicationCard
                            application={application}
                            handleClick={handleApplicationClick}
                        />
                    </Col>
                ))}
            </div>
        </Container>
    );
}

export default CareerExpertApplications;
