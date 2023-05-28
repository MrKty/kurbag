import React, { useState } from "react";
import { Container, Card, Form, Button, Row, Col } from "react-bootstrap";
import NavBar from "../components/NavBar";

const CreateEventPage = () => {
    const [eventName, setEventName] = useState("");
    const [organizer, setOrganizer] = useState("");
    const [coverPhoto, setCoverPhoto] = useState("");
    const [platform, setPlatform] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [limit, setLimit] = useState("");
    const [websiteLink, setWebsiteLink] = useState("");
    const [content, setContent] = useState("");
    const [speakers, setSpeakers] = useState("");
    const [creationDate, setCreationDate] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Perform form submission logic here

        // Clear form fields
        setEventName("");
        setOrganizer("");
        setCoverPhoto("");
        setPlatform("");
        setStartDate("");
        setEndDate("");
        setLimit("");
        setWebsiteLink("");
        setContent("");
        setSpeakers("");
        setCreationDate("");
    };

    return (
        <Container fluid>
            <NavBar/>
            <Card style={{ height: '600px', overflowY: 'scroll' }}>
                <Col>
                    <Card.Header className="fw-bold">Create Event</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="eventName">
                                        <Form.Label>Event Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter event name"
                                            value={eventName}
                                            onChange={(e) => setEventName(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="organizer">
                                        <Form.Label>Organizer</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter organizer"
                                            value={organizer}
                                            onChange={(e) => setOrganizer(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group controlId="coverPhoto" className="mt-2">
                                <Form.Label>Cover Photo</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter cover photo URL"
                                    value={coverPhoto}
                                    onChange={(e) => setCoverPhoto(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="platform" className="mt-2">
                                <Form.Label>Platform</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter platform"
                                    value={platform}
                                    onChange={(e) => setPlatform(e.target.value)}
                                />
                            </Form.Group>

                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="startDate" className="mt-2">
                                        <Form.Label>Start Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={startDate}
                                            onChange={(e) => setStartDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="endDate" className="mt-2">
                                        <Form.Label>End Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={endDate}
                                            onChange={(e) => setEndDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Form.Group controlId="limit" className="mt-2">
                                <Form.Label>Limit</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Enter limit"
                                    value={limit}
                                    onChange={(e) => setLimit(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="websiteLink" className="mt-2">
                                <Form.Label>Website Link</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter website link"
                                    value={websiteLink}
                                    onChange={(e) => setWebsiteLink(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="content" className="mt-2">
                                <Form.Label>Content</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    placeholder="Enter content"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="speakers" className="mt-2">
                                <Form.Label>Speakers</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter speakers"
                                    value={speakers}
                                    onChange={(e) => setSpeakers(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="creationDate" className="mt-2">
                                <Form.Label>Date of Creation</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={creationDate}
                                    onChange={(e) => setCreationDate(e.target.value)}
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Create Event
                            </Button>
                        </Form>
                    </Card.Body>
                </Col>
            </Card>
        </Container>
    );
};

export default CreateEventPage;
