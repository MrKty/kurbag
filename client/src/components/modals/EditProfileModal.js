import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const EditProfileModal = ({ showModal, handleClose }) => {
        const [selectedTag, setSelectedTag] = useState('');
        const handleTagSelect = (tag) => {
            setSelectedTag(tag);
        };
        const handleSubmit = (event) => {
        event.preventDefault();
        // Add code to submit the form
        handleClose()
    };

    return (
        <Modal dialogClassName="modal-dialog-centered modal-dialog-scrollable" show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <h5>Personal Information</h5>
              <Form.Group controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" placeholder="İpek" />
              </Form.Group>
              <Form.Group controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" placeholder="Öztaş" />
              </Form.Group>
    
              {/* Current Position Section */}
              <h5>Current Position</h5>
              <Form.Group controlId="formPosition">
                <Form.Label>Position</Form.Label>
                <Form.Control type="text" placeholder="Software Engineer" />
              </Form.Group>
              <Form.Group controlId="formSector">
                <Form.Label>Sector</Form.Label>
                <Form.Control type="text" placeholder="Technology" />
              </Form.Group>
    
              {/* Education Section */}
              <h5>Education</h5>
              {/* Add your education form fields and inputs here */}
              <Form.Group>
                        <Form.Label>Education</Form.Label>
                        <Form.Control as="select" value={selectedTag} onChange={(event) => handleTagSelect(event.target.value)} className="mb-3">
                            <option value="career">Bilkent University</option>
                        </Form.Control>
                    </Form.Group>
              {/* Location Section */}
              <h5>Location</h5>
              <Form.Group controlId="formCountry">
                <Form.Label>Country</Form.Label>
                <Form.Control type="text" placeholder="Country" />
              </Form.Group>
              <Form.Group controlId="formCity">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="City" />
              </Form.Group>
    
              <div className="d-grid gap-2">
                <Button variant="primary" type="submit">
                  Save Changes
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      );
};

export default EditProfileModal;