import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import sendRequest from "../../utils/request";

const CreatePostModal = ({ showModal, toggleCreatePostModal}) => {
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');

    const handlePostTitleChange = (event) => {
        setPostTitle(event.target.value);
    };

    const handlePostContentChange = (event) => {
        setPostContent(event.target.value);
    };

    const handlePostCreation = () => {
        const reqData = {
            postTitle,
            postContent
        }

        // Clear input fields and close the modal
        setPostTitle('');
        setPostContent('');
        sendRequest('home-create-post', 'POST', reqData, (data) => {
            alert(data.message);
        });
        handlePostClose();
    }

    const handlePostClose = () => {
        toggleCreatePostModal();
    };

    return (
        <Modal show={showModal} onHide={toggleCreatePostModal}>
            <Modal.Header closeButton>
                <Modal.Title>Create Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="postTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            value={postTitle}
                            onChange={handlePostTitleChange}
                            placeholder="Enter post title"
                        />
                    </Form.Group>
                    <Form.Group controlId="postContent">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            value={postContent}
                            onChange={handlePostContentChange}
                            placeholder="Enter post content"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handlePostClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handlePostCreation}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreatePostModal;
