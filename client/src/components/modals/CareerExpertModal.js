import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CareerExpertModal = ({ showModal, handleClose }) => {
    const [selectedTag, setSelectedTag] = useState('');
    const [motivation, setMotivation] = useState('');
    const [selectedCertificates, setSelectedCertificates] = useState([]);

    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
    };

    const handleCertificateSelect = (event) => {
        setSelectedCertificates([...selectedCertificates, event.target.files[0]]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add code to submit the form
        handleClose()
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Become a Career Expert</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Main Tags:</Form.Label>
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
                    {selectedTag && (
                        <Form.Group>
                            <Form.Label>Please select subtags:</Form.Label>
                            <div className="mb-3">
                                <Form.Check type="checkbox" label="Remote Work" />
                            </div>
                            <div className="mb-3">
                                <Form.Check type="checkbox" label="Internships" />
                            </div>
                            <div className="mb-3">
                                <Form.Check type="checkbox" label="Retirement" />
                            </div>
                            <div className="mb-3">
                                <Form.Check type="checkbox" label="Freelancer" />
                            </div>
                        </Form.Group>
                    )}
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