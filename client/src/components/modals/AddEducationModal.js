import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import sendRequest from "../../utils/request";
import ReactSearchBox from "react-search-box";

const AddEducationModal = ({showModal, handleClose}) => {
    const [gpa, setGPA] = useState('');
    const [department, setDepartment] = useState('');
    const [degree, setDegree] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startDate, setStartDate] = useState('');
    const [instName, setInstName] = useState('');
    const [about, setAbout] = useState('');
    const [location, setLocation] = useState('');
    const [schoolList, setSchoolList] = useState([]);
    const userId = localStorage.getItem('userId');

    const handleGPAChange = (event) => {
        setGPA(event.target.value);
    };

    const handleAboutChange = (event) => {
        setAbout(event.target.value);
    };

    const handleDepartmentChange = (event) => {
        setDepartment(event.target.value);
    };

    const handleInstNameChange = (event) => {
        // Send the form data to the backend
        console.log(event)
        if (event) {
            if (event.item) {
                setInstName(event)
            } else {
                setInstName(event)
                sendRequest('search-school', 'POST', {instName}, (data) => {
                    setSchoolList(data.school_names);
                });
            }
        }
    };

    const handleSelectInstName = (event) => {
        // Send the form data to the backend
        if (event.item) {
            setInstName(event)
        }
    }

const handleLocationChange = (event) => {
    setLocation(event.target.value);
};

const handleDegreeChange = (event) => {
    setDegree(event.target.value);
    console.log(instName)
};

const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
};

const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
};

const handleSubmit = () => {
    const requestData = {
        userId,
        gpa,
        department,
        degree,
        instName,
        endDate,
        startDate,
        about,
        location
    };

    // Send the form data to the backend
    sendRequest('add-education', 'POST', requestData, (data) => {
        alert(data.message);
    });

    // Clear input fields and close the modal
    setGPA('');
    setDepartment('');
    setDegree('');
    setEndDate('');
    setStartDate('');
    setInstName('');
    setAbout('');
    setLocation('');
    handleClose();
};


return (
    <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Add Education</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
                <Form.Group controlId="gpa">
                    <Form.Label>GPA</Form.Label>
                    <Form.Control
                        type="number"
                        value={gpa}
                        onChange={handleGPAChange}
                        placeholder="Enter GPA"
                    />
                </Form.Group>
                <Form.Group controlId="department">
                    <Form.Label>Department</Form.Label>
                    <Form.Control
                        type="text"
                        value={department}
                        onChange={handleDepartmentChange}
                        placeholder="Enter department"
                    />
                </Form.Group>
                <Form.Group controlId="instName">
                    <Form.Label>Institution</Form.Label>
                    <ReactSearchBox
                        placeholder="Enter Institution Name"
                        name={"instName"}
                        value={instName}
                        data={schoolList}
                        onChange={handleInstNameChange}
                        clearOnSelect={false}
                        onSelect={handleSelectInstName}
                    />

                </Form.Group>
                <Form.Group controlId="degree">
                    <Form.Label>Degree</Form.Label>
                    <Form.Control
                        type="text"
                        value={degree}
                        onChange={handleDegreeChange}
                        placeholder="Enter degree"
                    />
                </Form.Group>
                <Form.Group controlId="endDate">
                    <Form.Label>Education End Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={endDate}
                        onChange={handleEndDateChange}
                        placeholder="Enter education end date"
                    />
                </Form.Group>
                <Form.Group controlId="startDate">
                    <Form.Label>Education Start Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={startDate}
                        onChange={handleStartDateChange}
                        placeholder="Enter education start date"
                    />
                </Form.Group>
                <Form.Group controlId="location">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        type="text"
                        value={location}
                        onChange={handleLocationChange}
                        placeholder="Enter location"
                    />
                </Form.Group>
                <Form.Group controlId="about">
                    <Form.Label>Enter Education Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={about}
                        onChange={handleAboutChange}
                        placeholder="Enter description"
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
}
;

export default AddEducationModal;
