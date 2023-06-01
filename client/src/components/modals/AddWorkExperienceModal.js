import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import sendRequest from "../../utils/request";

const AddWorkExperienceModal = ({ showModal, handleClose }) => {
    const [workMode, setWorkMode] = useState('');
    const [workType, setWorkType] = useState('');
    const [role, setRole] = useState('');
    const [orgName, setOrgName] = useState('');
    const [profession, setProfession] = useState('');
    const [jobEndDate, setJobEndDate] = useState('');
    const [jobStartDate, setJobStartDate] = useState('');
    const userId = localStorage.getItem('userId');

    const handleWorkModeChange = (event) => {
        setWorkMode(event.target.value);
    };

    const handleWorkTypeChange = (event) => {
        setWorkType(event.target.value);
    };

    const handleOrgNameChange = (event) => {
        setOrgName(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleProfessionChange = (event) => {
        setProfession(event.target.value);
    };

    const handleJobEndDateChange = (event) => {
        setJobEndDate(event.target.value);
    };

    const handleJobStartDateChange = (event) => {
        setJobStartDate(event.target.value);
    };

    const handleSubmit = () => {
        const requestData = {
            userId,
            workMode,
            workType,
            role,
            profession,
            orgName,
            jobEndDate,
            jobStartDate
        };

        // Send the form data to the backend
        sendRequest('add-work-experience', 'POST', requestData, (data) => {
            alert(data.message);
        });

        // Clear input fields and close the modal
        setWorkMode('');
        setWorkType('');
        setRole('');
        setProfession('');
        setJobEndDate('');
        setJobStartDate('');
        setOrgName('');
        handleClose();
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Work Experience</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="workMode">
                        <Form.Label>Work Mode</Form.Label>
                        <Form.Control
                            type="text"
                            value={workMode}
                            onChange={handleWorkModeChange}
                            placeholder="Enter work mode"
                        />
                    </Form.Group>
                    <Form.Group controlId="workType">
                        <Form.Label>Work Type</Form.Label>
                        <Form.Control
                            type="text"
                            value={workType}
                            onChange={handleWorkTypeChange}
                            placeholder="Enter work type"
                        />
                    </Form.Group>
                    <Form.Group controlId="orgName">
                        <Form.Label>Company</Form.Label>
                        <Form.Control
                            type="text"
                            value={orgName}
                            onChange={handleOrgNameChange}
                            placeholder="Enter company name"
                        />
                    </Form.Group>
                    <Form.Group controlId="role">
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            type="text"
                            value={role}
                            onChange={handleRoleChange}
                            placeholder="Enter role"
                        />
                    </Form.Group>
                    <Form.Group controlId="profession">
                        <Form.Label>Profession</Form.Label>
                        <Form.Control
                            type="text"
                            value={profession}
                            onChange={handleProfessionChange}
                            placeholder="Enter profession"
                        />
                    </Form.Group>
                    <Form.Group controlId="jobEndDate">
                        <Form.Label>Job End Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={jobEndDate}
                            onChange={handleJobEndDateChange}
                            placeholder="Enter job end date"
                        />
                    </Form.Group>
                    <Form.Group controlId="jobStartDate">
                        <Form.Label>Job Start Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={jobStartDate}
                            onChange={handleJobStartDateChange}
                            placeholder="Enter job start date"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Add to Profile
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddWorkExperienceModal;
