import {Card, Col, Row} from "react-bootstrap";
import React from "react";

const ExperienceCard = ({companyLogo, companyName, role, startDate, endDate}) => {
    return (
        <Card className="mb-3">
            <Card.Body>
                <Row>
                    <Col xs={3} md={2}>
                        <img src={companyLogo} alt="Company Logo" className="img-fluid"/>
                    </Col>
                    <Col xs={9} md={10}>
                        <h5>{companyName}</h5>
                        <p>{role}</p>
                        <p>
                            {startDate} - {endDate}
                        </p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default ExperienceCard;