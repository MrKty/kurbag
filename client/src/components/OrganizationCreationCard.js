import React, {useState} from 'react';
import {Form, Button, Card, Row, Col} from "react-bootstrap";

const OrganizationCreationCard = () => {
    const [formData, setFormData] = useState({
        organizationName: '',
        organizationType: '',
        organizationSize: '',
        organizationAddress: '',
        organizationWebsite: '',
        organizationIndustry: '',
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

    const showContent = formData.organizationType === 'Company' ? (
        <div>
            <Form.Group className="mb-3" controlId="industry">
                <Form.Label >Company Industry</Form.Label>
                <Form.Control
                    as="select"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select an Industry</option>
                    <option value="IT">Information Technology (IT)</option>
                    <option value="Finance and Banking">Finance and Banking</option>
                    <option value="Health and Medicine">Health and Medicine</option>
                    <option value="Education">Education</option>
                    <option value="Retail">Retail</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Transportation and Logistics">Transportation and Logistics</option>
                    <option value="Hospitality and Tourism">Hospitality and Tourism</option>
                    <option value="Energy and Utilities">Energy and Utilities</option>
                    <option value="Construction and Engineering">Construction and Engineering</option>
                </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" controlId="companyType">
                <Form.Label >Company Type</Form.Label>
                <Form.Control
                    as="select"
                    name="companyType"
                    value={formData.companyType}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a Company Type</option>
                    <option value="Sole proprietorship">Sole proprietorship</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Limited Liability Company (LLC)">Limited Liability Company (LLC)</option>
                    <option value="Corporation">Corporation</option>
                    <option value="Non-profit organization">Non-profit organization</option>
                    <option value="Cooperative">Cooperative</option>
                    <option value="Franchise">Franchise</option>
                    <option value="Joint venture">Joint venture</option>
                    <option value="Holding company">Holding company</option>
                    <option value="S Corporation">S Corporation</option>
                </Form.Control>
            </Form.Group>
        </div>
    ) : formData.organizationType === 'Institution' ? (
        <Form.Group className="mb-3" controlId="institutionType">
            <Form.Label>Institution Type</Form.Label>
            <Form.Control
                as="select"
                name="institutionType"
                value={formData.institutionType}
                onChange={handleChange}
                required
            >
                <option value="">Select an Institution Type</option>
                <option value="University">University</option>
                <option value="College">College</option>
                <option value="School">School</option>
                <option value="Hospital">Hospital</option>
                <option value="Non-profit organization">Non-profit organization</option>
                <option value="Government agency">Government agency</option>
                <option value="Research institute">Research institute</option>
            </Form.Control>
        </Form.Group>
    ) : null;

    return (
        <Card className="mx-auto w-50 shadow rounded-3">
            <Card.Body>
                <h2 className="text-center mb-3 fw-bold color-green">Create A New Organization</h2>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Form.Group className="mb-3" controlId="organizationName">
                            <Form.Label className={"visually-hidden"}>Organization Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="organizationName"
                                value={formData.organizationName}
                                onChange={handleChange}
                                placeholder={"Enter Organization Name"}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="organizationType">
                            <Form.Label>Organization Type</Form.Label>
                            <div>
                                <Form.Check
                                    inline
                                    type="radio"
                                    name="organizationType"
                                    value="Company"
                                    label="Company"
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    name="organizationType"
                                    value="Institution"
                                    label="Institution"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="organizationSize">
                            <Form.Label>Organization Size</Form.Label>
                            <div>
                                <Form.Check
                                    inline
                                    type="radio"
                                    name="organizationSize"
                                    value="Small"
                                    label="1-10 Employee"
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    name="organizationSize"
                                    value="Medium"
                                    label="10-100 Employee"
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    name="organizationSize"
                                    value="Big"
                                    label="100-1000 Employee"
                                    onChange={handleChange}
                                    required
                                />
                                <Form.Check
                                    inline
                                    type="radio"
                                    name="organizationSize"
                                    value="VeryBig"
                                    label="1000+ Employee"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="organizationAddress">
                        <Form.Label className={"visually-hidden"}>Organization Address</Form.Label>
                        <Form.Control
                            type="text"
                            name="organizationAddress"
                            value={formData.organizationAddress}
                            onChange={handleChange}
                            placeholder={"Enter Organization Address"}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="organizationWebsite">
                        <Form.Label className={"visually-hidden"}>Organization Website</Form.Label>
                        <Form.Control
                            type="url"
                            name="organizationWebsite"
                            value={formData.organizationWebsite}
                            onChange={handleChange}
                            placeholder={"Enter Organization Website"}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="phone">
                        <Form.Label className={"visually-hidden"}>Organization Phone Number</Form.Label>
                        <Form.Control
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder={"Enter Organization Phone Number"}
                            required
                        />
                    </Form.Group>

                    {showContent}

                    <Button variant={"success"} type="submit"
                            className={"col-12 rounded-3 p-2 fw-bold bg-color-green "}>
                        Create Account
                    </Button>
                </Form>
                <div className="mt-2 text-center">
                    Already have an account? <a href="/login" className={"no-underline"}>Log In</a>
                </div>
                <div className={"text-center"}>OR</div>
                <div className="text-center">
                    <a href="/signup" className={"no-underline"}>Create Normal Account</a>
                </div>
            </Card.Body>
        </Card>
    );
};

export default OrganizationCreationCard;