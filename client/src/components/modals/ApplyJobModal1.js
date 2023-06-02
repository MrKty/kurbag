import {Badge, Button, Col, Form, Image, Modal, Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import sendRequest from "../../utils/request";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const ApplyJobModal1 = ({currentModal, handleCloseModal, handleApplyClick, jobId}) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [profilePhoto, setProfilePhoto] = useState('');
    const [summary, setSummary] = useState("");
    const [coverLetter, setCoverLetter] = useState("");
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState('');
    const [resume, setResume] = useState('');
    const userId = localStorage.getItem("userId")

    const handleImageChange = async (event) => {
        const newPhoto = event.target.files[0]
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(newPhoto.name);
        await fileRef.put(newPhoto);
        const photoUrl = await fileRef.getDownloadURL();
        setProfilePhoto(photoUrl);
    };

    const handleResumeChange = async (event) => {
        const newResume = event.target.files[0]
        const storageRef = firebase.storage().ref();
        const fileRef = storageRef.child(newResume.name);
        await fileRef.put(newResume);
        const fileUrl = await fileRef.getDownloadURL();
        setResume(fileUrl);
        alert("Resume is uploaded")
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if any field is empty
        if (
            !firstName ||
            !lastName ||
            !phone ||
            !email ||
            !summary ||
            skills.length === 0
        ) {
            // Handle the case when a field is empty
            alert("All fields are required");
            return;
        }

        const requestData = {
            userId,
            jobId,
            firstName,
            lastName,
            phone,
            email,
            summary,
            "photo": profilePhoto,
            coverLetter,
            resume,
            skillsString: skills.join(","),
        };

        console.log(requestData)

        sendRequest("apply-job", "POST", requestData, (data) => {
            // Handle the response from the backend
            alert(data.message);
        });

        // Clear form fields
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");
        setSummary("");
        setSkills([]);
        setSkillInput("");
        setCoverLetter("");
        setResume("");
        handleApplyClick()
    };


    const handleAddSkill = () => {
        if (skillInput.trim() !== '') {
            setSkills([...skills, skillInput]);
            setSkillInput('');
        }
    }


    useEffect(() => {
        // Fetch data from Sends_Request table

        sendRequest("get-user-info", "POST", {userId}, (data) => {
            // Handle the response from the backend
            setFirstName(data.first_name);
            setLastName(data.last_name);
            setPhone(data.phone_no);
            setEmail(data.mail_addr);
            setProfilePhoto(data.profilePicture);
        });
    }, []);




    useEffect(() => {
        // Fetch data from Sends_Request table
        if (currentModal) {
            sendRequest('get-user-for-job-application', 'POST', {}, (data) => {
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setPhone(data.phone_no);
                setEmail(data.mail_addr);
                setProfilePhoto(data.profile_pic);
            });
        }
    }, [currentModal]);

    return (
        <Modal show={currentModal === 0} onHide={handleCloseModal} className={"modal-lg"}>
            <Modal.Header closeButton>
                <Modal.Title>Apply to Sony</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row>
                    <h5>Contact Info:</h5>
                </Row>
                <div className="d-flex align-items-center mb-3">
                    <label htmlFor="image-upload">
                        <img
                            src={profilePhoto}
                            alt="Profile photo"
                            className="rounded-circle me-3"
                            style={{width: "100px"}}
                        />
                        <input type="file" id="image-upload" onChange={handleImageChange}
                               className={"visually-hidden"}/>
                    </label>
                    <Row>
                        <Row className={"my-2"}>
                            <Col className={"col-4 align-self-center visually-hidden"}>First name:</Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter first name"
                                    value={firstName}
                                    readOnly={true}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row>
                            <Col className={"col-4 visually-hidden"}>Last name:</Col>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter last name"
                                    value={lastName}
                                    readOnly={true}
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Col>
                        </Row>
                    </Row>
                </div>
                <div>
                    <div>Phone:</div>
                    <div className="d-flex align-items-center mb-2">
                        <Form.Control
                            type="text"
                            placeholder="Enter Mobile Phone Number"
                            value={phone}
                            readOnly={true}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div>Email:</div>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email Address"
                        value={email}
                        readOnly={true}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <div>Summary:</div>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        style={{resize: "none"}}
                        placeholder="Enter About Yourself"
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                    />
                </div>
                <div className="my-3">
                    <Form.Group>
                        {resume &&
                            <a href={resume} target="_blank" className="no-underline my-2">
                                Uploaded Resume
                            </a>
                        }
                    </Form.Group>
                    <Form.Label htmlFor="resume" className="btn btn-outline-primary fw-bold rounded-5">
                        Upload Resume
                    </Form.Label>
                    <Form.Control type="file" onChange={handleResumeChange} className="form-control visually-hidden"
                                  id="resume"/>
                    <small className={"d-block text-muted"}>DOC, DOCX, PDF (2 MB)</small>
                </div>
                <div className="mb-3">
                    <Form.Label htmlFor="coverLetter">Cover Letter</Form.Label>
                    <Form.Control as="textarea" id="coverLetter" value={coverLetter}
                                  onChange={(e) => setCoverLetter(e.target.value)}
                                  rows={5}/>
                </div>
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
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ApplyJobModal1;