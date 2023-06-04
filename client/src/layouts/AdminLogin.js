import React, {useState} from "react";
import LoginCard from "../components/LoginCard"
import logo from '../icons/app_logo_with_name.svg';
import {Alert, Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import sendRequest from "../utils/request";

function AdminLogin() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create an object with the login data
        const loginData = {
            email,
            password
        };

        sendRequest('login', 'POST', loginData, (data) => {
            // Handle the response from the backend
            if (data.message === 'Logged in successfully!') {
                // Store the ID in the local storage
                localStorage.setItem('userId', data.id);
                localStorage.setItem('userType', data.userType);
                console.log(data.userType);
                window.location.href = "/analysis";
            } else {
                setErrorMessage(data.message);
            }
        });
    };

    return (
        // Following is used to make component fill the whole page
        <Container fluid className={"vh-100"} style={{backgroundColor: "#F0F2F5"}}>
            <Image src={logo} alt="Logo" className={"d-block mx-auto w-25 pt-3 pb-3"}/>
            <Row>
                <Card className="text-center w-50 mx-auto shadow rounded-3">
                    <Card.Body>
                        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                        <Card.Title className="p-2 fw-bold mt-3 display-6 color-green">
                            Welcome Back Admin
                        </Card.Title>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formBasicEmail" className="p-2 mt-3">
                                <Form.Label className="visually-hidden">Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Enter Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword" className="p-2 mt-3">
                                <Form.Label className="visually-hidden">Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>
                            <Button
                                variant="success"
                                type="submit"
                                className="col-10 rounded-3 p-2 fw-bold mt-3"
                            >
                                LOG IN
                            </Button>
                            <Col className="text-right">
                                <Alert.Link href="/login" className="no-underline">
                                    Normal Account Login
                                </Alert.Link>
                            </Col>
                        </Form>
                    </Card.Body>
                </Card>
            </Row>
        </Container>
    );
}

export default AdminLogin;
