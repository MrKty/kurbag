import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const NotFound = () => {
    return (
        <Container>
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
        </Container>
    );
};

export default NotFound;