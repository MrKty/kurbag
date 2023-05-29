import {Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import React from "react";
const ApplyJobModal6 = ({ currentModal, handleCloseModal}) => {

    return (
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
    )

};

export default ApplyJobModal6
