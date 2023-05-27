import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import sendRequest from "../../utils/request";

const CareerExpertModal = ({ showModal, handleClose }) => {
    const [selectedTag, setSelectedTag] = useState('');
    const [motivation, setMotivation] = useState('');
    const [selectedCertificates, setSelectedCertificates] = useState([]);

    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
    };

    const handleCertificateSelect = async (event) => {
        const files = event.target.files;
        const urls = [];
        console.log("Here")
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log(file)
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(file.name);
            await fileRef.put(file);
            const url = await fileRef.getDownloadURL();
            urls.push(url);
            console.log(url)
        }

        setSelectedCertificates([...selectedCertificates, ...urls]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add code to submit the form
        const applicationData = {
            selectedTag,
            motivation,
            selectedCertificates
        };

        sendRequest('career-expert-application', 'POST', applicationData, (data) => {
            console.log(data)
        });
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Become sa Career Expert</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Select a main tag you want to apply:</Form.Label>
                        <Form.Control as="select" value={selectedTag} onChange={(event) => handleTagSelect(event.target.value)} className="mb-3">
                            <option value="">Select a tag</option>
                            <option value="career">Career</option>
                            <option value="job-search">Job Search</option>
                            <option value="workplace">Workplace</option>
                            <option value="technology">Technology</option>
                            <option value="engineering">Engineering</option>
                            <option value="job-skills">Job Skills</option>
                            <option value="education">Education</option>
                            <option value="marketing">Marketing</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Motivation:</Form.Label>
                        <Form.Control as="textarea" rows={3} value={motivation} onChange={(event) => setMotivation(event.target.value)} className="mb-3" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Certificates:</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleCertificateSelect} multiple className="mb-3" />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="success" type="submit" className="mb-3">Apply</Button>
                    </div>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CareerExpertModal;