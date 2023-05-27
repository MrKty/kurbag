import React from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";

const events = [
    {
        eventName: "Event 1",
        organizer: "Organizer 1",
        coverPhoto: "cover1.jpg",
        platform: "Platform 1",
        startDate: "2023-06-01",
        endDate: "2023-06-03",
        limit: 100,
        websiteLink: "https://www.example.com/event1",
        content: "Event 1 description",
        speakers: "Speaker 1, Speaker 2",
        creationDate: "2023-05-20",
    },
    {
        eventName: "Event 2",
        organizer: "Organizer 2",
        coverPhoto: "cover2.jpg",
        platform: "Platform 2",
        startDate: "2023-06-10",
        endDate: "2023-06-12",
        limit: 50,
        websiteLink: "https://www.example.com/event2",
        content: "Event 2 description",
        speakers: "Speaker 3, Speaker 4",
        creationDate: "2023-05-25",
    },
];

const ViewEventsPage = () => {
    return (
        <Container>
            <Row>
                {events.map((event, index) => (
                    <Col md={4} key={index}>
                        <Card>
                            <Card.Img variant="top" src={event.coverPhoto} />
                            <Card.Body>
                                <Card.Title>{event.eventName}</Card.Title>
                                <Card.Text>
                                    <strong>Organizer:</strong> {event.organizer}
                                    <br />
                                    <strong>Platform:</strong> {event.platform}
                                    <br />
                                    <strong>Date:</strong> {event.startDate} - {event.endDate}
                                </Card.Text>
                                <Button variant="primary" href={event.websiteLink}>
                                    View Event
                                </Button>
                            </Card.Body>
                            <Card.Footer>
                                <small className="text-muted">
                                    <strong>Speakers:</strong> {event.speakers}
                                    <br />
                                    <strong>Created on:</strong> {event.creationDate}
                                </small>
                            </Card.Footer>
                        </Card>
                        <br />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ViewEventsPage;
