import React, {useState} from 'react';
import {Form, Button, Card, Row, Col} from "react-bootstrap";

const SignupCard = () => {
    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phone: '',
        password: '',
        day: '',
        month: '',
        year: '',
        gender: '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <Card className="mx-auto w-50 shadow rounded-3">
            <Card.Body>
                <h2 className="text-center mb-3 fw-bold color-green">Create A New Account</h2>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            <Form.Group className="mb-3" controlId="name">
                                <Form.Label className={"visually-hidden"}>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder={"Enter Your Name"}
                                    required
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group className="mb-3" controlId="surname">
                                <Form.Label className={"visually-hidden"}>Surname</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="surname"
                                    value={formData.surname}
                                    onChange={handleChange}
                                    placeholder={"Enter Your Surname"}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label className={"visually-hidden"}>Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder={"Enter Email"}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label className={"visually-hidden"}>Phone Number</Form.Label>
                        <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={"Enter Phone Number"}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label className={"visually-hidden"}>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder={"Enter Password"}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="dob">
                        <Form.Label>Date of Birth</Form.Label>
                        <div className="d-flex">
                            <Form.Control
                                className="me-2"
                                as="select"
                                name="day"
                                value={formData.day}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Day</option>
                                {[...Array(31)].map((_, i) => (
                                    <option key={i} value={i + 1}>
                                        {i + 1}
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Control
                                className="me-2"
                                as="select"
                                name="month"
                                value={formData.month}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Month</option>
                                {[
                                    'January',
                                    'February',
                                    'March',
                                    'April',
                                    'May',
                                    'June',
                                    'July',
                                    'August',
                                    'September',
                                    'October',
                                    'November',
                                    'December',
                                ].map((month) => (
                                    <option key={month} value={month}>
                                        {month}
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Control
                                as="select"
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Year</option>
                                {[...Array(100)].map((_, i) => (
                                    <option key={i} value={new Date().getFullYear() - i}>
                                        {new Date().getFullYear() - i}
                                    </option>
                                ))}
                            </Form.Control>
                        </div>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <div>
                            <Form.Check
                                inline
                                type="radio"
                                name="gender"
                                value="Female"
                                label="Female"
                                onChange={handleChange}
                                required
                            />
                            <Form.Check
                                inline
                                type="radio"
                                name="gender"
                                value="Male"
                                label="Male"
                                onChange={handleChange}
                                required
                            />
                            <Form.Check
                                inline
                                type="radio"
                                name="gender"
                                value="Other"
                                label="Other"
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </Form.Group>
                    <Button variant={"success"} type="submit"
                            className={"col-12 rounded-3 p-2 fw-bold bg-color-green "}>
                        SIGN UP
                    </Button>
                </Form>
                <div className="mt-2 text-center">
                    Already have an account? <a href="/login" className={"no-underline"}>Log In</a>
                </div>
            </Card.Body>
        </Card>
    );
};

export default SignupCard;