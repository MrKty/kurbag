import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import sendRequest from '../../utils/request';

const EditProfileModal = ({ showModal, handleClose }) => {

  const [profileData, setProfileData] = useState(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [sector, setSector] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');

  useEffect(() => {
    const userId = localStorage.getItem('userId');

    sendRequest('profile-real', 'POST', { userId }, (data) => {
      setProfileData(data);
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setPosition(data.current_position);
      setSector(data.current_sector);
      setCountry(data.current_country);
      setCity(data.current_city);
    });
  }, []);


  // Helper function to get month name from the month index
  function getMonthName(monthIndex) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthIndex];
  }

  function formatDate(date) {
    const dateObj = new Date(date)
    return `${dateObj.getDate()} ${getMonthName(dateObj.getMonth())} ${dateObj.getFullYear()} ${dateObj.getHours()}:${dateObj.getMinutes()}`;

  }

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

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const id = localStorage.getItem("userId");
    // Add code to submit the form to the backend
    const formData = {
      id,
      firstName,
      lastName,
      position,
      sector,
      country,
      city,
    };

    sendRequest('update-profile', 'POST', formData, (data) => {
      // Here comes blog data from backend
    });

    console.log(formData);
    handleClose();
  };

  if(!profileData) {
    return (
        <h2>LOADING DATA...</h2>
    )
  }

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
            <Form.Control type="text" placeholder={profileData.first_name} value={firstName} onChange={handleFirstNameChange} />
          </Form.Group>
          <Form.Group controlId="formLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control type="text" placeholder={profileData.last_name} value={lastName} onChange={handleLastNameChange} />
          </Form.Group>

          {/* Current Position Section */}
          <h5>Current Position</h5>
          <Form.Group controlId="formPosition">
            <Form.Label>Position</Form.Label>
            <Form.Control type="text" placeholder={profileData.current_position} value={position} onChange={handlePositionChange} />
          </Form.Group>
          <Form.Group controlId="formSector">
            <Form.Label>Sector</Form.Label>
            <Form.Control type="text" placeholder={profileData.current_position} value={sector} onChange={handleSectorChange} />
          </Form.Group>

          {/* Location Section */}
          <h5>Location</h5>
          <Form.Group controlId="formCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control type="text" placeholder={profileData.current_country} value={country} onChange={handleCountryChange} />
          </Form.Group>
          <Form.Group controlId="formCity">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder={profileData.current_city}  value={city} onChange={handleCityChange} />
          </Form.Group>

          <div className="d-grid gap-2 mt-2">
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
