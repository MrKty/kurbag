import React, { useState } from "react";
import {Container, Row, Col, Button} from 'react-bootstrap';
import NavBar from "../components/NavBar";
import CareerExpertModal from "../components/modals/CareerExpertModal";

const Blogs = () => {
    const [showModal, setShowModal] = useState(false);
    const [userType, setUserType] = useState(0);

    const handleClick = (type) => {
        if (userType === type) {
            // Rerender the page
            // Add your code to rerender the page here
            console.log('Rerendering page');
        } else {
            // Open the popup
            setShowModal(true);
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <Container fluid>
            <NavBar handleClick={handleClick}/>
            <Row className="justify-content-center">
                <Col xs={10} md={8} lg={6}>
                    <div className="text-center">
                        <h1 className="display-1">404</h1>
                        <h2 className="mb-4">Page Not Found</h2>
                        <p className="lead">The page you are looking for does not exist.</p>
                        <Button href="/" variant="primary">Return to Site</Button>
                    </div>
                </Col>
            </Row>

            <CareerExpertModal showModal={showModal} handleClose={handleClose} />
        </Container>
    );
};

export default Blogs;