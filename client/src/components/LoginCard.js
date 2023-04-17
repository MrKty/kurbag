import {Alert, Button, Card, Col, Form} from "react-bootstrap";
import React from "react";

function LoginCard() {
    // visually hidden property only be shown to the screen readers
    return <Card className="text-center w-50 mx-auto shadow rounded-3">
        <Card.Body>
            <Card.Title className={"p-2 fw-bold mt-3 display-6 color-green" }>Welcome Back</Card.Title>
            <Form>
                <Form.Group controlId="formBasicEmail" className={"p-2 mt-3"}>
                    <Form.Label className={"visually-hidden"}>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email"/>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className={"p-2 mt-3"}>
                    <Form.Label className={"visually-hidden"}>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password"/>
                </Form.Group>

                <Button variant={"success"} type="submit" className={"col-10 rounded-3 p-2 fw-bold mt-3 bg-color-green"}>
                    LOG IN
                </Button>

                <Col className="mt-3">
                    <Col>
                        <Alert.Link href="#" className={"no-underline"}>Forgotten account?</Alert.Link>
                    </Col>
                    <hr/>
                    <Col className="text-right">
                        <Alert.Link href="/signup" className={"no-underline"}>Create new account</Alert.Link>
                    </Col>
                </Col>
            </Form>
        </Card.Body>
    </Card>
}

export default LoginCard;