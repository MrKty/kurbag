import React, {useState, useEffect} from 'react';
import {Modal, Form, Button, Row, Col, Image, Badge} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import {sendRequest} from './helpers';
import CreatePostModal from "./CreatePostModal"; // Import the sendRequest function here

const CreateEventModal = ({showModal, toggleCreateEventModal, contacts}) => {
    const [eventTitle, setEventTitle] = useState('');
    const [eventContent, setEventContent] = useState('');
    const [eventOrganizer, setEventOrganizer] = useState('');
    const [eventPlatform, setEventPlatform] = useState('');
    const [eventStartDate, setEventStartDate] = useState('');
    const [eventEndDate, setEventEndDate] = useState('');
    const [eventLimit, setEventLimit] = useState('');
    const [eventLink, setEventLink] = useState('');
    const [eventSpeakers, setEventSpeakers] = useState([]);
    const [eventCoverPhoto, setEventCoverPhoto] = useState(null);

    const handleEventCoverPhotoChange = (event) => {
        setEventCoverPhoto(event.target.files[0]);
    };

    const handleEventTitleChange = (e) => {
        setEventTitle(e.target.value);
    };

    const handleEventContentChange = (e) => {
        setEventContent(e.target.value);
    };

    const handleEventOrganizerChange = (e) => {
        setEventOrganizer(e.target.value);
    };

    const handleEventPlatformChange = (e) => {
        setEventPlatform(e.target.value);
    };

    const handleEventStartDateChange = (e) => {
        setEventStartDate(e.target.value);
    };

    const handleEventEndDateChange = (e) => {
        setEventEndDate(e.target.value);
    };

    const handleEventLimitChange = (e) => {
        setEventLimit(e.target.value);
    };

    const handleEventLinkChange = (e) => {
        setEventLink(e.target.value);
    };

    const handleEventSpeakersChange = (e) => {
        const selectedSpeaker = e.target.value;
        setEventSpeakers((prevSpeakers) => [...prevSpeakers, selectedSpeaker]);
    };

    const removeSpeaker = (id) => {
        setEventSpeakers(eventSpeakers.filter((speaker) => speaker.id !== id));
    };

    const handleEventCreation = async () => {
        const reqData = {
            eventTitle,
            eventContent,
            eventOrganizer,
            eventPlatform,
            eventStartDate,
            eventEndDate,
            eventLimit,
            eventLink,
            eventSpeakers,
        };

        if (eventCoverPhoto) {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(eventCoverPhoto.name);
            await fileRef.put(eventCoverPhoto);
            reqData['coverPhotoUrl'] = await fileRef.getDownloadURL();
        }

        sendRequest('home-event', 'POST', reqData, (data) => {
            alert(data.message);
        });

        toggleCreateEventModal();
    };

    const handleEventClose = () => {
        toggleCreateEventModal();
    };

    const eventModalHeight = eventCoverPhoto ? '45vh' : '25vh';

    useEffect(() => {
        if (eventCoverPhoto) {
            setEventModalHeight('45vh');
        } else {
            setEventModalHeight('25vh');
        }
    }, [eventCoverPhoto]);

    return (
        <Modal show={showModal} onHide={handleEventClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Event</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="eventTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={eventTitle} onChange={handleEventTitleChange}/>
                    </Form.Group>
                    <Form.Group controlId="eventContent">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" rows={3} value={eventContent} onChange={handleEventContentChange}/>
                    </Form.Group>
                    <Form.Group controlId="eventOrganizer">
                        <Form.Label>Organizer</Form.Label>
                        <Form.Control type="text" value={eventOrganizer} onChange={handleEventOrganizerChange}/>
                    </Form.Group>
                    <Form.Group controlId="eventPlatform">
                        <Form.Label>Platform</Form.Label>
                        <Form.Control type="text" value={eventPlatform} onChange={handleEventPlatformChange}/>
                    </Form.Group>
                    <Row>
                        <Col>
                            <Form.Group controlId="eventStartDate">
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control type="date" value={eventStartDate} onChange={handleEventStartDateChange}/>
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group controlId="eventEndDate">
                                <Form.Label>End Date</Form.Label>
                                <Form.Control type="date" value={eventEndDate} onChange={handleEventEndDateChange}/>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group controlId="eventLimit">
                        <Form.Label>Limit</Form.Label>
                        <Form.Control type="number" value={eventLimit} onChange={handleEventLimitChange}/>
                    </Form.Group>
                    <Form.Group controlId="eventLink">
                        <Form.Label>Link</Form.Label>
                        <Form.Control type="text" value={eventLink} onChange={handleEventLinkChange}/>
                    </Form.Group>
                    <Form.Group controlId="eventSpeakers">
                        <Form.Label>Speakers</Form.Label>
                        <Form.Control as="select" value="" onChange={handleEventSpeakersChange}>
                            <option value="" disabled>Select Speaker</option>
                            {contacts.map((contact) => (
                                <option key={contact.id} value={contact.id}>
                                    {contact.name}
                                </option>
                            ))}
                        </Form.Control>
                        {eventSpeakers.length > 0 && (
                            <div>
                                {eventSpeakers.map((speaker) => (
                                    <Badge key={speaker.id} variant="secondary" className="mr-1">
                                        {speaker.name}
                                        <FontAwesomeIcon
                                            icon={faTimes}
                                            className="ml-1 cursor-pointer"
                                            onClick={() => removeSpeaker(speaker.id)}
                                        />
                                    </Badge>
                                ))}
                            </div>
                        )}
                    </Form.Group>
                    <Form.Group controlId="eventCoverPhoto">
                        <Form.Label>Cover Photo</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleEventCoverPhotoChange}/>
                        {eventCoverPhoto && (
                            <Image src={URL.createObjectURL(eventCoverPhoto)} alt="Event Cover" fluid className="mt-2"/>
                        )}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleEventClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleEventSave}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateEventModal;

//<CreatePostModal showModal={showCreatePostModal} handlePostClose={toggleCreatePostModal}/>
//<CreateEventModal showModal={showCreateEventModal} toggleCreateEventModal={toggleCreateEventModal} contacts={contacts}/>