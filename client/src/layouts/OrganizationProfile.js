import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import sendRequest from "../utils/request";
import NavBar from "../components/NavBar";

const OrganizationProfile = () => {
    /*
        const [orgData, setOrgData] = useState(null);

        useEffect(() => {
            const orgId = localStorage.getItem("orgId");

            sendRequest("organization", "POST", { orgId }, (data) => {
                setOrgData(data);
            });
        }, []);

        if (!orgData) {
            return <h2>LOADING DATA...</h2>;
        }
        */

    let orgData = {
        name: "XYZ Company",
        photo: "https://www.zdnet.com/a/img/resize/b875a130a720d51fc03b9ab0f2cb84fa104a0080/2020/12/18/96b7b3e9-d4a9-4b6e-ac5b-36f21ab777ff/remote-work-2021-header.jpg?auto=webp&width=1280",
        location: "Amsterdam",
        website: "Link",
        size: 200,
        industry: "Software",
        ranking: 56,
        followers_count: 2598
    }

    return (
        <Container fluid>
            <NavBar/>
            <Row className="justify-content-center align-items-center">
                <Col xs={10} md={10} lg={10}>
                    <div className="d-flex justify-content-between align-items-center">
                        <h2 className="mt-2" style={{ fontSize: "2.5rem" }}>
                            {orgData.name}
                        </h2>
                        <div>
                            <Button variant="primary" className="me-3">Follow</Button>
                            <Button variant="secondary">See Jobs</Button>
                        </div>
                    </div>
                    <Card>
                        <Row>
                            <Col xs={4}>
                                <Card.Img variant="top" src={orgData.photo} fluid/>
                            </Col>
                            <Col xs={8}>
                                <Card.Body>
                                    <Card.Title>{orgData.name}</Card.Title>
                                    <Card.Text>Location: {orgData.location}</Card.Text>
                                    <Card.Text>Website: {orgData.website}</Card.Text>
                                    <Card.Text>
                                        Number of Followers: {orgData.followers_count}
                                    </Card.Text>
                                    <Card.Text>Size: {orgData.size}</Card.Text>
                                    {localStorage.getItem("userType") === "company" ? (
                                        <Card.Text>Industry: {orgData.industry}</Card.Text>
                                    ) : (
                                        <Card.Text>Ranking: {orgData.ranking}</Card.Text>
                                    )}
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );

}

export default OrganizationProfile;
