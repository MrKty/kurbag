import {Button, Card, Col, Row} from "react-bootstrap";
import React from "react";

const ProfileCard = ({
                         firstName,
                         lastName,
                         birthDate,
                         sector,
                         position,
                         city,
                         country,
                         gender,
                         connectionCount,
                         profilePicture,
                         handleEditProfile,
                         handleAddEducation,
                         handleAddWorkExperience,
                         handleFollow,
                         ownProfile,
                         isFollowing,
                         about
                     }) => {

    return (
        <Card>
            <Card.Body>
                <Row className="align-items-center">
                    <Col xs={3} sm={3} md={3} className="text-center mb-3 mb-sm-0">
                        <img src={profilePicture} alt="Profile Picture" className={"rounded-circle img-fluid"}/>
                    </Col>
                    <Col xs={3} sm={3} md={3}>
                        <h4>{firstName} {lastName}</h4>
                        <p><strong>Birth Date:</strong> {birthDate}</p>
                        <p><strong>Gender:</strong> {gender}</p>
                        <p><strong>Connections:</strong> {connectionCount}</p>
                    </Col>
                    <Col xs={3} sm={3} md={3}>
                        <p><strong>Location:</strong> {city}{city && (<span> , </span>)}{country}</p>
                        <p><strong>Sector:</strong> {sector}</p>
                        <p><strong>Position:</strong> {position}</p>
                    </Col>
                    <Col xs={3} sm={3} md={3}>
                        <Row>
                            {ownProfile ? (
                                <>
                                    <Button
                                        className="mt-2"
                                        variant="primary"
                                        onClick={handleEditProfile}
                                        style={{padding: "0.5rem"}}
                                    >
                                        Edit Profile
                                    </Button>
                                    <Button
                                        className="mt-2"
                                        variant="primary"
                                        onClick={handleAddEducation}
                                        style={{padding: "0.5rem"}}
                                    >
                                        Add Education
                                    </Button>
                                    <Button
                                        className="mt-2"
                                        variant="primary"
                                        onClick={handleAddWorkExperience}
                                        style={{padding: "0.5rem"}}
                                    >
                                        Add Work Exp
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    className="mt-2"
                                    variant="primary"
                                    onClick={handleFollow}
                                    style={{padding: "0.5rem"}}
                                >
                                    {!isFollowing ? "Follow" : "Unfollow"}
                                </Button>
                            )}
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <h5>
                        About:
                    </h5>
                    <p>
                        {about}
                    </p>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default ProfileCard