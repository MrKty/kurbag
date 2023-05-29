import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import NavBar from "../components/NavBar";

const CreateJobPage = () => {
    const [organization, setOrganization] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [type, setType] = useState("");
    const [location, setLocation] = useState("");
    const [mode, setMode] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform form submission logic here

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
            <NavBar />
            <Card className="mt-2" style={{ height: "600px", overflowY: "scroll" }}>
                <Col>
                    <Card.Header className="fw-bold">Create Job</Card.Header>
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
