import { Card, Button, Col, Container, Row } from 'react-bootstrap';

const CvCard = ({ name, sector, position, experience, currentEmployer }) => {
    return (
        <Container>
            <Card>
                <Card.Body>
                    <Row>
                        <Col xs={8}>
                            <Card.Title>{name}</Card.Title>
                        </Col>
                        <Col xs={4} className="text-end">
                            <Button variant="primary" className="me-2">
                                Message
                            </Button>
                            <Button variant="secondary">View Profile</Button>
                        </Col>
                    </Row>
                    <Card.Text>
                        <strong>Sector:</strong> {sector}
                    </Card.Text>
                    <Card.Text>
                        <strong>Position:</strong> {position}
                    </Card.Text>
                    <Card.Text>
                        <strong>Experience:</strong> {experience}
                    </Card.Text>
                    <Card.Text>
                        <strong>Current Employer:</strong> {currentEmployer}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default CvCard;
