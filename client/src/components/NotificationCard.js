import {Card, Col, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const NotificationCard = ({title, description, time}) => {
    return (
        <Card className="mb-3" style={{backgroundColor: "#b6cdbd"}}>
            <Card.Body>
                <Row>
                    <Col className="d-flex col-11 fw-bold justify-content-start align-self-center">
                        {title}
                    </Col>
                    <Col className="d-flex col-1 justify-content-end align-self-center">
                        <button className="btn btn-link">
                            <FontAwesomeIcon icon={faTimes}/>
                        </button>
                    </Col>

                </Row>
                <Card.Text>{description}</Card.Text>
                <Card.Subtitle className="text-muted">{time}</Card.Subtitle>
            </Card.Body>
        </Card>
    );
};

export default NotificationCard