import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const CreatePostModal = ({ showModal, handlePostClose}) => {
    const [postTitle, setPostTitle] = useState('');
    const [postContent, setPostContent] = useState('');

    const handlePostTitleChange = (event) => {
        setPostTitle(event.target.value);
    };

    const handlePostContentChange = (event) => {
        setPostContent(event.target.value);
    };

    const handlePostSaveClick = () => {
        const postData = {
            title: postTitle,
            content: postContent,
        };
        //handlePostSave(postData);
    };

    return (
        <Modal show={showModal} onHide={handlePostClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="postTitle">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" value={postTitle} onChange={handlePostTitleChange} />
                    </Form.Group>
                    <Form.Group controlId="postContent">
                        <Form.Label>Content</Form.Label>
                        <Form.Control as="textarea" rows={3} value={postContent} onChange={handlePostContentChange} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handlePostClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handlePostSaveClick}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreatePostModal;
