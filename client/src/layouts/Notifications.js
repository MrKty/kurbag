import NavBar from "../components/NavBar";

import React from 'react';
import {Container, Row, Col, Card, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';
import {useState} from "react";
import OrganizationNavBar from "../components/OrganizationNavBar";
import NotificationCard from "../components/NotificationCard";

const Notifications = () => {
    const notifications = [
        {title: 'Notification 1', description: 'This is the first notification.', time: '10:00 AM'},
        {title: 'Notification 2', description: 'This is the second notification.', time: '11:30 AM'},
        {title: 'Notification 3', description: 'This is the third notification.', time: '1:45 PM'},
        {title: 'Notification 1', description: 'This is the first notification.', time: '10:00 AM'},
        {title: 'Notification 2', description: 'This is the second notification.', time: '11:30 AM'},
        {title: 'Notification 3', description: 'This is the third notification.', time: '1:45 PM'},
        {title: 'Notification 1', description: 'This is the first notification.', time: '10:00 AM'},
        {title: 'Notification 2', description: 'This is the second notification.', time: '11:30 AM'},
        {title: 'Notification 3', description: 'This is the third notification.', time: '1:45 PM'},
        {title: 'Notification 1', description: 'This is the first notification.', time: '10:00 AM'},
        {title: 'Notification 2', description: 'This is the second notification.', time: '11:30 AM'},
        {title: 'Notification 15', description: 'This is the third notification.', time: '1:45 PM'},
        // Add more notifications here
    ];

    const [isFirst, setIsFirst] = useState(false);

    const handleToggle = () => {
        setIsFirst(!isFirst);
    };

    //TODO ADD A TOGGLE OR DROPDOWN TO SORT THE NOTIF BY THEIR TIMES.

    return (
        <Container fluid>
            {localStorage.getItem("userType") > 3 ? <OrganizationNavBar activeLink="notifications"/> :
                <NavBar activeLink="notifications"/>}
            <Col md={12} className="align-items-center">
                <Row className="mt-3 mb-4">
                    <h1 className="d-flex justify-content-center fw-bold">Your Notifications</h1>
                    {isFirst ? (
                        <h2>First To Last</h2>
                    ) : (
                        <h2>Last To First</h2>
                    )}
                </Row>
                <Row>
                    <Form>
                        <Form.Check
                            type="switch"
                            id="toggle-switch"
                            label={isFirst ? 'First' : 'Last'}
                            checked={isFirst}
                            onChange={handleToggle}
                        />
                    </Form>
                </Row>
                <Row className="justify-content-center mt-2">
                    <Col sm={6} style={{height: '600px', overflowY: 'scroll'}}>
                        {notifications.map((notification, index) => (
                            <NotificationCard
                                key={index}
                                title={notification.title}
                                description={notification.description}
                                time={notification.time}
                            />
                        ))}
                    </Col>
                </Row>
            </Col>
        </Container>
    );

};

export default Notifications;
