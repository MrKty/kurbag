import {Button, Card, Col, Row} from "react-bootstrap";
import React from "react";

const ProfileCard = ({
                         firstName,
                         lastName,
                         birthDate,
                         gender,
                         connectionCount,
                         profilePicture,
                         handleEditProfile,
                     }) => {

    return (
        <Card>
            <Card.Body>
                <Row className="align-items-center">
                    <Col xs={12} sm={3} md={2} className="text-center mb-3 mb-sm-0">
                        <img src={profilePicture} alt="Profile Picture" roundedCircle fluid/>
                    </Col>
                    <Col xs={12} sm={9} md={10}>
                        <h4>{firstName} {lastName}</h4>
                        <p><strong>Birth Date:</strong> {birthDate}</p>
                        <p><strong>Gender:</strong> {gender}</p>
                        <p><strong>Connections:</strong> {connectionCount}</p>
                        <Button variant="primary" onClick={handleEditProfile}>Edit Profile</Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default ProfileCard