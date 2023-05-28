import React from "react";
import { Card, Button } from "react-bootstrap";

const EventCard = ({ event, onRegisterEvent }) => {
    const {
        eventName,
        organizer,
        coverPhoto,
        platform,
        startDate,
        endDate,
        limit,
        websiteLink,
        content,
        speakers,
        creationDate,
    } = event;

    const handleRegisterEvent = () => {
        // Perform registration logic here
        // You can pass additional event information to the onRegisterEvent function if needed
        //onRegisterEvent(event);
    };

    return (
        <Card className="col-6 mt-2 mb-2" style={{ minHeight: "100px", maxHeight: "400px", position: "relative" }}>
            <div style={{ maxHeight: "200px", overflow: "hidden", width: "100%", height: "200px" }}>
                <div style={{ background: `url(${coverPhoto})`, backgroundSize: "cover", backgroundPosition: "center", width: "100%", height: "100%" }}></div>
            </div>
            <Card.Body style={{ overflowY: "auto" }}>
                {/* Card content */}
                <Card.Title>{eventName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{organizer}</Card.Subtitle>
                <Card.Text>{content}</Card.Text>
                <Card.Text>Speakers: {speakers}</Card.Text>
                <Card.Text>Start Date: {startDate}</Card.Text>
                <Card.Text>End Date: {endDate}</Card.Text>
                <Card.Text>Platform: {platform}</Card.Text>
                <Card.Text>Website: {websiteLink}</Card.Text>
                <Card.Text>Creation Date: {creationDate}</Card.Text>
                <Card.Text>Limit: {limit}</Card.Text>
                <div style={{ position: "absolute", bottom: "10px", right: "40px" }}>
                    <Button variant="primary" onClick={handleRegisterEvent}>
                        Register Event
                    </Button>
                </div>
            </Card.Body>
        </Card>

    );
};

export default EventCard;
