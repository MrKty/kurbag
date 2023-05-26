import React, { useState } from "react";
import { Alert, Button, Card, Col, Form } from "react-bootstrap";
import sendRequest from "../utils/request";

function LoginCard() {
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
                // Redirect to the home URL
                window.location.href = "/home";
            } else {
                // Display error message
                //TODO popup olarak gösterilecek
                setErrorMessage(data.message);
            }
        });
    };

    return (
        <Card className="text-center w-50 mx-auto shadow rounded-3">
            <Card.Body>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
                <Card.Title className="p-2 fw-bold mt-3 display-6 color-green">
                    Welcome Back
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

                    <Col className="mt-3">
                        <Col>
                            <Alert.Link href="#" className="no-underline">
                                Forgotten account?
                            </Alert.Link>
                        </Col>
                        <hr />
                        <Col className="text-right">
                            <Alert.Link href="/signup" className="no-underline">
                                Create new account
                            </Alert.Link>
                        </Col>
                    </Col>
                </Form>
            </Card.Body>
        </Card>
    );
}

export default LoginCard;