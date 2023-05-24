import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditProfileModal = ({ showModal, handleClose }) => {
        const handleSubmit = (event) => {
        event.preventDefault();
        // Add code to submit the form
        handleClose()
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Add your form fields and inputs here */}
          <Form.Group controlId="formFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your first name" />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Enter your last name" />
          </Form.Group>
          {/* Add more form fields as needed */}
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
        </Modal>
    );
};

export default EditProfileModal;