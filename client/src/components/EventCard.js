import React from "react";
import {Card, Button, Image} from "react-bootstrap";
import sendRequest from "../utils/request";

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
        id
    } = event;

    const handleRegisterEvent = () => {
        const requestData = {
            userId: localStorage.getItem("userId"),
            eventId: id
        }

        sendRequest('register-event', 'POST', requestData, (data) => {
            // Update the state with the new data
            alert(data.message)
        });
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return `${formattedDate} ${formattedTime}`;
    }

    return (
        <Card className="col-6 mt-2 mb-2">
            <Card.Body style={{ minHeight: "100px", maxHeight: "300px", overflowY: "auto" }}>
                <Card.Img className={"img-fluid"} style={{maxHeight: "150px"}} src={coverPhoto}/>
                <Card.Title>{eventName}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{organizer}</Card.Subtitle>
                <Card.Text>{content}</Card.Text>
                <Card.Text>Speakers: {speakers}</Card.Text>
                <Card.Text>Start Date: {formatDate(startDate)}</Card.Text>
                <Card.Text>End Date: {formatDate(endDate)}</Card.Text>
                <Card.Text>Platform: {platform}</Card.Text>
                <Card.Text>Website: {websiteLink}</Card.Text>
                <Card.Text>Creation Date: {creationDate}</Card.Text>
                <Card.Text>Remaining Quota: {limit}</Card.Text>
            </Card.Body>
            <Card.Footer>
                <Button variant="primary" onClick={handleRegisterEvent}>
                    Register Event
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default EventCard;
