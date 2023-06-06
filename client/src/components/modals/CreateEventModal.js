import React, {useState, useEffect} from 'react';
import {Modal, Form, Button, Row, Col, Image, Badge} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faImage} from '@fortawesome/free-solid-svg-icons';
import sendRequest from "../../utils/request";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const CreateEventModal = ({showModal, toggleCreateEventModal}) => {
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
    const [contacts, setContacts] = useState([]);

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

        /*
        // Clear input fields and close the modal
        setEventCoverPhoto(null);
        setEventTitle('');
        setEventContent('');
        setEventOrganizer('');
        setEventPlatform('');
        setEventStartDate('');
        setEventEndDate('');
        setEventLimit('');
        setEventLink('');
        setEventSpeakers([]);
         */

        sendRequest('home-event', 'POST', reqData, (data) => {
            alert(data.message);
        });

        toggleCreateEventModal();
    };

    const handleEventClose = () => {
        toggleCreateEventModal();
    };

    // Fetch contacts from the backend
    useEffect(() => {
        if (showModal) {
            sendRequest('/api/contacts', 'POST', {}, (data) => {
                if (data.contacts) {
                    console.log(data.contacts)
                    setContacts(data.contacts)
                } else {
                    alert('Error fetching contacts')
                }
            });
            sendRequest('/api/get-user-name', 'POST', {}, (data) => {
                if (data.name) {
                    console.log(data.name)
                    setEventOrganizer(data.name)
                } else {
                    alert('Error fetching creator name')
                }
            });
        }

    }, [showModal]);


    return (
        <Modal show={showModal} onHide={handleEventClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Event</Modal.Title>
            </Modal.Header>

            <Modal.Body style={{overflowY: "auto", maxHeight: "500px"}}>
                <Row>
                    <Col className={'text-center'}>
                        <label htmlFor="image-upload">
                            {eventCoverPhoto ? (
                                <Image
                                    src={URL.createObjectURL(eventCoverPhoto)}
                                    alt="Selected"
                                    className={'w-100'}
                                />
                            ) : (
                                <div
                                    className={'d-flex align-items-center justify-content-center bg-secondary rounded w-100 h-100'}>
                                    <FontAwesomeIcon icon={faImage} size={'3x'}/>
                                </div>
                            )}

                            <input type="file" id="image-upload" onChange={handleEventCoverPhotoChange}
                                   className={"visually-hidden"}/>
                        </label>
                    </Col>
                </Row>
                <Form>
                    <Row>
                        <Form.Group controlId="eventTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={eventTitle}
                                onChange={handleEventTitleChange}
                                placeholder="Enter event title"
                            />
                        </Form.Group>
                        <Form.Group controlId="eventContent">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                value={eventContent}
                                onChange={handleEventContentChange}
                                placeholder="Enter event content"
                            />
                        </Form.Group>
                        <Form.Group controlId="eventOrganizer">
                            <Form.Label>Organizer</Form.Label>
                            <Form.Control
                                type="text"
                                value={eventOrganizer}
                                onChange={handleEventOrganizerChange}
                                placeholder="Select Event Organizer"
                                readOnly={true}
                            />
                        </Form.Group>
                        <Form.Group controlId="eventPlatform">
                            <Form.Label>Platform</Form.Label>
                            <Form.Control
                                type="text"
                                value={eventPlatform}
                                onChange={handleEventPlatformChange}
                                placeholder="Enter event platform"
                            />
                        </Form.Group>
                        <Form.Group controlId="eventStartDate">
                            <Form.Label>Start Date</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={eventStartDate}
                                onChange={handleEventStartDateChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="eventEndDate">
                            <Form.Label>End Date</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                value={eventEndDate}
                                onChange={handleEventEndDateChange}
                            />
                        </Form.Group>
                        <Form.Group controlId="eventLimit">
                            <Form.Label>Limit (Quota)</Form.Label>
                            <Form.Control
                                type="number"
                                value={eventLimit}
                                onChange={handleEventLimitChange}
                                placeholder="Enter event limit"
                            />
                        </Form.Group>
                        <Form.Group controlId="eventLink">
                            <Form.Label>Link</Form.Label>
                            <Form.Control
                                type="text"
                                value={eventLink}
                                onChange={handleEventLinkChange}
                                placeholder="Enter event link"
                            />
                        </Form.Group>
                        <Form.Group controlId="eventSpeakers">
                            <Form.Label>Speakers</Form.Label>
                            <div>
                                {eventSpeakers.map(speaker => (
                                    <Badge key={speaker} variant="primary" className="mr-2">
                                        {speaker}
                                        <span
                                            className="ml-1 cursor-pointer"
                                            onClick={() => removeSpeaker(speaker)}
                                        >
                                                    &#x2715;
                                                </span>
                                    </Badge>
                                ))}
                            </div>
                            <Form.Select
                                value={eventSpeakers}
                                onChange={handleEventSpeakersChange}
                                placeholder="Select event speakers"
                            >
                                <option value="">Select speakers</option>
                                {contacts.map(contact => (
                                    <option key={contact.id} value={contact.name}>
                                        {contact.name}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Row>

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleEventClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleEventCreation}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateEventModal;