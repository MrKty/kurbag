import {Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import React from "react";
const ApplyJobModal5 = ({ currentModal, handleCloseModal, handleApplyClick}) => {

    return (
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
        )
};

export default ApplyJobModal5
