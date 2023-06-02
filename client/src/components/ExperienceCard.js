import {Card, Col, Row} from "react-bootstrap";
import React from "react";

const ExperienceCard = ({companyLogo, companyName, role, startDate, endDate, about}) => {
    const end = endDate ? endDate : "Continues"
    return (
        <Card className="mb-3">
            <Card.Body>
                <Row>
                    <Col xs={3} md={2}>
                        <img src={companyLogo} alt="Company Logo" className="img-fluid"/>
                    </Col>
                    <Col>
                        <Card.Text>
                            Your title: <strong>{role}</strong><br/>
                            Company: <strong>{companyName}</strong><br/>
                            Dates of Employment: <strong>{startDate} - {end}</strong><br/>
                            Description: <strong>{about}</strong>
                        </Card.Text>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default ExperienceCard;