import { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import sendRequest from '../../utils/request';

const EditProfileModal = ({ showModal, handleClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [sector, setSector] = useState('');
  const [education, setEducation] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    // Fetch profile data from the backend
    sendRequest('profile-data', 'POST', {}, (data) => {
      const { firstName, lastName, position, sector, education, country, city } = data;

      setFirstName(firstName);
      setLastName(lastName);
      setPosition(position);
      setSector(sector);
      setEducation(education);
      setCountry(country);
      setCity(city);
    });
  }, []);

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePositionChange = (event) => {
    setPosition(event.target.value);
  };

  const handleSectorChange = (event) => {
    setSector(event.target.value);
  };

  const handleEducationChange = (event) => {
    setEducation(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code to submit the form to the backend
    const formData = {
      firstName,
      lastName,
      position,
      sector,
      education,
      country,
      city,
    };
    console.log(formData);
    handleClose();
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
            <Form.Control type="text" placeholder="İpek" value={firstName} onChange={handleFirstNameChange} />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder="Öztaş" value={lastName} onChange={handleLastNameChange} />
          </Form.Group>

          {/* Current Position Section */}
          <h5>Current Position</h5>
          <Form.Group controlId="formPosition">
            <Form.Label>Position</Form.Label>
            <Form.Control type="text" placeholder="Software Engineer" value={position} onChange={handlePositionChange} />
          </Form.Group>
          <Form.Group controlId="formSector">
            <Form.Label>Sector</Form.Label>
            <Form.Control type="text" placeholder="Technology" value={sector} onChange={handleSectorChange} />
          </Form.Group>

          {/* Education Section */}
          <h5>Education</h5>
          <Form.Group>
            <Form.Label>Education</Form.Label>
            <Form.Control as="select" value={education} onChange={handleEducationChange} className="mb-3">
              <option value="Bilkent University">Bilkent University</option>
              {/* Add other education options here */}
            </Form.Control>
          </Form.Group>

          {/* Location Section */}
          <h5>Location</h5>
          <Form.Group controlId="formCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder="Country" value={country} onChange={handleCountryChange} />
          </Form.Group>
          <Form.Group controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City" value={city} onChange={handleCityChange} />
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
