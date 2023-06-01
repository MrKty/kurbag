import React, {useEffect, useState} from 'react';
import {Modal, Button, Form, Row, Col} from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import sendRequest from '../../utils/request';

const CareerExpertModal = ({showModal, handleClose}) => {
    const [selectedTag, setSelectedTag] = useState('');
    const [motivation, setMotivation] = useState('');
    const [selectedCertificates, setSelectedCertificates] = useState([]);
    const [selectedCertificateNames, setSelectedCertificateNames] = useState([]);
    const [hasApplication, setHasApplication] = useState(false); // Track whether user has an existing application

    const [certificateNames, setCertificateNames] = useState([]);
    const [certificateUrls, setCertificateUrls] = useState([]);

    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
    };

    useEffect(() => {
        if (showModal){
            // Fetch data from Sends_Request table
            sendRequest('career-expert-modal', 'POST', {}, (data) => {
                try {
                    const {motivation_letter, tag_name, certificates} = data;

                    setSelectedTag(tag_name);
                    setMotivation(motivation_letter);

                    // Convert certificates array to array of certificate URLs
                    const urls = certificates.map((certificate) => {
                        console.log(certificate.cert_url)
                        return certificate.cert_url
                    });
                    const names = certificates.map((certificate) => certificate.cert_name);

                    setSelectedCertificates(urls);
                    setSelectedCertificateNames(names);

                    setCertificateUrls(urls);
                    setCertificateNames(names);

                    // Check if motivation letter exists
                    if (motivation_letter) {
                        setHasApplication(true);
                    }
                } catch (error) {
                    console.log('Error fetching data:', error);
                    setHasApplication(false)
                }
            });
        }
    }, [showModal]);

    const handleCertificateSelect = async (event) => {
        const files = event.target.files;
        const urls = [];
        const names = [];

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            const url = await fileRef.getDownloadURL();
            urls.push(url);
            names.push(file.name);
        }

        setSelectedCertificateNames([...selectedCertificateNames, ...names]);
        setSelectedCertificates([...selectedCertificates, ...urls]);
        setCertificateNames([...certificateNames, ...names]);
        setCertificateUrls([...certificateUrls, ...urls]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add code to submit the form
        const applicationData = {
            selectedTag,
            motivation,
            selectedCertificates,
            selectedCertificateNames
        };

        sendRequest('career-expert-application', 'POST', applicationData, (data) => {
            console.log(data.message);
            alert(data.message);
        });
        handleClose()
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Become a Career Expert</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    {!hasApplication ? (
                        <>
                            <Form.Group>
                                <Form.Label>Select a main tag you want to apply:</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedTag}
                                    onChange={(event) => handleTagSelect(event.target.value)}
                                    className="mb-3"
                                >
                                    <option value="">Select a tag</option>
                                    <option value="Career">Career</option>
                                    <option value="Job Search">Job Search</option>
                                    <option value="Workplace">Workplace</option>
                                    <option value="Technology">Technology</option>
                                    <option value="Engineering">Engineering</option>
                                    <option value="Job Skills">Job Skills</option>
                                    <option value="Education">Education</option>
                                    <option value="Marketing">Marketing</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Motivation:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={motivation}
                                    onChange={(event) => setMotivation(event.target.value)}
                                    className="mb-3"
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Certificates:</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleCertificateSelect}
                                    multiple
                                    className="mb-3"
                                />
                            </Form.Group>

                            {certificateNames.length > 0 &&
                                <Form.Group className={"mb-3"}>
                                    <Form.Label className="fw-bold">Certificates:</Form.Label>
                                    <Row>
                                        <Col md={12}>
                                            {certificateNames.map((name, index) => (
                                                <div
                                                    key={index}
                                                    style={{
                                                        maxWidth: "100%",
                                                        whiteSpace: "nowrap",
                                                        textOverflow: "ellipsis",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    <a href={certificateUrls[index]} target="_blank"
                                                       rel="noopener noreferrer">
                                                        {name}
                                                    </a>
                                                </div>
                                            ))}
                                        </Col>
                                    </Row>
                                </Form.Group>
                            }

                            <div className="d-grid gap-2">
                                <Button variant="success" type="submit" className="mb-3">
                                    Apply
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Form.Group>
                                <Form.Label className="fw-bold">Edit Your Application:</Form.Label>
                                <Form.Control
                                    as="select"
                                    value={selectedTag}
                                    onChange={(event) => handleTagSelect(event.target.value)}
                                    className="mb-3"
                                >
                                    <option value="" disabled>{selectedTag}</option>
                                    <option value="career" selected={selectedTag === 'career'}>
                                        Career
                                    </option>
                                    <option value="job-search" selected={selectedTag === 'job-search'}>
                                        Job Search
                                    </option>
                                    <option value="workplace" selected={selectedTag === 'workplace'}>
                                        Workplace
                                    </option>
                                    <option value="technology" selected={selectedTag === 'technology'}>
                                        Technology
                                    </option>
                                    <option value="engineering" selected={selectedTag === 'engineering'}>
                                        Engineering
                                    </option>
                                    <option value="job-skills" selected={selectedTag === 'job-skills'}>
                                        Job Skills
                                    </option>
                                    <option value="education" selected={selectedTag === 'education'}>
                                        Education
                                    </option>
                                    <option value="marketing" selected={selectedTag === 'marketing'}>
                                        Marketing
                                    </option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="fw-bold">Motivation:</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={3}
                                    value={motivation}
                                    onChange={(event) => setMotivation(event.target.value)}
                                    className="mb-3"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Certificates:</Form.Label>
                                <Form.Control
                                    type="file"
                                    accept="image/*"
                                    onChange={handleCertificateSelect}
                                    multiple
                                    className="mb-3"
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label className="fw-bold">Certificates:</Form.Label>
                                <Row>
                                    <Col md={12}>
                                        {certificateNames.map((name, index) => (
                                            <div
                                                key={index}
                                                style={{
                                                    maxWidth: "100%",
                                                    whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <a href={certificateUrls[index]} target="_blank"
                                                   rel="noopener noreferrer">
                                                    {name}
                                                </a>
                                            </div>
                                        ))}
                                    </Col>
                                </Row>

                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="success" type="submit" className="mb-3 mt-1">
                                    Edit
                                </Button>
                            </div>
                        </>
                    )}
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CareerExpertModal;
