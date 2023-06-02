import React, {useEffect, useState} from "react";
import {Container, Card, Form, Button, Row, Col, Badge} from "react-bootstrap";
import NavBar from "../components/NavBar";
import RecruiterNavBar from "../components/RecruiterNavBar";
import sendRequest from "../utils/request";

const CreateJob = () => {
    const [organization, setOrganization] = useState("");
    const [description, setDescription] = useState("");
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [workType, setWorkType] = useState('');
    const [workMode, setWorkMode] = useState('');
    const [minAge, setMinAge] = useState('');
    const [maxAge, setMaxAge] = useState('');
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState('');
    const [dueDate, setDueDate] = useState("");
    const recruiterId = localStorage.getItem("userId");
    const [backEndMessage, setBackEndMessage] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if any field is empty
        if (
            !organization ||
            !description ||
            !title ||
            !workType ||
            !location ||
            !workMode ||
            !dueDate ||
            !recruiterId
        ) {
            // Handle the case when a field is empty
            console.log("All fields are required");
            return;
        }

        const skillsString = skills.join(',');

        const requestData = {
            organization,
            description,
            title,
            workType,
            location,
            workMode,
            dueDate,
            recruiterId,
            minAge,
            maxAge,
            skillsString
        };

        sendRequest("create-job", "POST", requestData, (data) => {
            // Handle the response from the backend
            alert(data.message)
        });

        // Clear form fields
        setDescription("");
        setTitle("");
        setWorkType("");
        setLocation("");
        setWorkMode("");
        setDueDate("");
        setSkills([]);
        setSkillInput('');
        setMinAge('');
        setMaxAge('');
    }

    const handleAddSkill = () => {
        if (skillInput.trim() !== '') {
            setSkills([...skills, skillInput]);
            setSkillInput('');
        }
    }

    useEffect(() => {
        // Fetch data from Sends_Request table
        sendRequest('get-company-recruiter', 'POST', {}, (data) => {
                if (data.org_name){
                    setOrganization(data.org_name)
                }
        });
    }, []);

    return (
        <Container fluid>
            <RecruiterNavBar/>
            <Card className="mt-2" style={{maxHeight: "600px", overflowY: "scroll"}}>
                <Col>
                    <Card.Header className="fw-bold">Create Job: {backEndMessage}</Card.Header>
                    <Card.Body>
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6}>
                                    <Form.Group controlId="title" className="">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter title"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="organization">
                                        <Form.Label>Organization</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter organization"
                                            value={organization}
                                            readOnly={true}
                                            onChange={(e) => setOrganization(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Form.Group controlId="workType">
                                        <Form.Label>Work Type</Form.Label>
                                        <Form.Control as="select" value={workType}
                                                      onChange={(e) => setWorkType(e.target.value)}>
                                            <option value="">Select work type</option>
                                            <option value="full-time">Full-time</option>
                                            <option value="part-time">Part-time</option>
                                            <option value="internship">Internship</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group controlId="workMode">
                                        <Form.Label>Work Mode</Form.Label>
                                        <Form.Control as="select" value={workMode}
                                                      onChange={(e) => setWorkMode(e.target.value)}>
                                            <option value="">Select work mode</option>
                                            <option value="on-site">On-site</option>
                                            <option value="remote">Remote</option>
                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Row>
                                    <Col>
                                        <Form.Group controlId="minAge">
                                            <Form.Label>Minimum Age</Form.Label>
                                            <Form.Control type="number" value={minAge}
                                                          onChange={(e) => setMinAge(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="maxAge">
                                            <Form.Label>Maximum Age</Form.Label>
                                            <Form.Control type="number" value={maxAge}
                                                          onChange={(e) => setMaxAge(e.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group controlId="skills">
                                    <Form.Label>Skills</Form.Label>
                                    <div className={"mb-2"}>
                                        {skills.map((skill, index) => (
                                            <Badge key={index} variant="primary" className="me-2">
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter a skill"
                                        value={skillInput}
                                        onChange={(e) => setSkillInput(e.target.value)}
                                    />
                                    <Button variant="primary" onClick={handleAddSkill} className="mt-2">
                                        Add Skill
                                    </Button>
                                </Form.Group>
                                <Col md={6}>
                                    <Form.Group controlId="location" className="mt-2">
                                        <Form.Label>Location</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter location"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row>


                                <Col md={6}>
                                    <Form.Group controlId="dueDate" className="mt-2">
                                        <Form.Label>Due Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={dueDate}
                                            onChange={(e) => setDueDate(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>

                            <Row>
                                <Col md={12}>
                                    <Form.Group controlId="description">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={5}
                                            placeholder="Enter description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Button variant="primary" type="submit" className="mt-3" onClick={handleSubmit}>
                                Create Job
                            </Button>
                        </Form>
                    </Card.Body>
                </Col>
            </Card>
        </Container>
    );
};

export default CreateJob
