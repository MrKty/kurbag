import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import NavBar from "../components/NavBar";
import RecruiterNavBar from "../components/RecruiterNavBar";
import sendRequest from "../utils/request";

const CreateJobPage = () => {
    const [organization, setOrganization] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [location, setLocation] = useState("");
    const [mode, setMode] = useState("");
    const [dueDate, setDueDate] = useState("");
    const recruiterId = localStorage.getItem("userId");
    const [backEndMessage, setBackEndMessage] = useState("initial back-end message.");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any field is empty
        if (
            !organization ||
            !description ||
            !title ||
            !type ||
            !location ||
            !mode ||
            !dueDate ||
            !recruiterId
        ) {
            // Handle the case when a field is empty
            console.log("All fields are required");
            return;
        }

        const requestData = {
            organization,
            description,
            title,
            type,
            location,
            mode,
            dueDate,
            recruiterId,
        };

        sendRequest("create-job", "POST", requestData, (data) => {
            // Handle the response from the backend
            setBackEndMessage(data);
        });

        // Clear form fields
        setOrganization("");
        setDescription("");
        setTitle("");
        setType("");
        setLocation("");
        setMode("");
        setDueDate("");
    };

    return (
        <Container fluid>
            <RecruiterNavBar />
            <Card className="mt-2" style={{ height: "600px", overflowY: "scroll" }}>
                <Col>
                    <Card.Header className="fw-bold">Create Job: {backEndMessage}</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="title" className="mt-2">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="organization">
                                        <Form.Label>Organization</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter organization"
                                            value={organization}
                                            onChange={(e) => setOrganization(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="type" className="mt-2">
                                        <Form.Label>Type</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter type"
                                            value={type}
                                            onChange={(e) => setType(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group controlId="location" className="mt-2">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter location"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="mode" className="mt-2">
                                        <Form.Label>Mode</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter mode"
                                            value={mode}
                                            onChange={(e) => setMode(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>

                                <Col md={6}>
                                    <Form.Group controlId="dueDate" className="mt-2">
                                        <Form.Label>Due Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12}>
                                    <Form.Group controlId="description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            placeholder="Enter description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit" className="mt-3">
                                Create Job
                            </Button>
                        </Form>
                    </Card.Body>
                </Col>
            </Card>
        </Container>
    );
};

export default CreateJobPage;
