import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import {Button, Card, Col, Container, Form, Image, Row} from "react-bootstrap";
import image from "../icons/add-image.png"
import CareerExpertNavBar from "../components/CareerExpertNavBar";
import sendRequest from "../utils/request";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";

function BlogEditor() {
    const [selectedTag, setSelectedTag] = useState('');
    const [coverPhoto, setCoverPhoto] = useState(null);
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");

    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
    };

    const handleImageChange = (event) => {
        setCoverPhoto(event.target.files[0]);
    };

    /*
    const handleAddPhoto = () => {
        // implement logic for adding a photo to the content
    };

    const handleAddVideo = () => {
        // implement logic for adding a video to the content
    };

    const handleAddCodeBlock = () => {
        // implement logic for adding a code block to the content
    };

     */

    const handlePublish = async () => {
        if (coverPhoto) {
            const storageRef = firebase.storage().ref();
            const fileRef = storageRef.child(coverPhoto.name);
            await fileRef.put(coverPhoto);
            const url = await fileRef.getDownloadURL();

            const requestData = {
                coverPhotoUrl: url,
                title: title,
                summary: summary,
                content: content,
                selectedTag: selectedTag,
            };

            sendRequest("blogEditor", "POST", requestData, (data) => {
                // Handle the response from the backend
            });
        }
    };

    return (
        <>
            <CareerExpertNavBar activeLink="write-blog"/>
            <Card className={"w-75 mx-auto m-2"}>
                <Row>
                    <Col>
                        <h2 className={"fw-bold text-center display-5"}>Write a Blog</h2>
                    </Col>
                </Row>

                <Row className={'my-4'}>
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                        <Form.Group className={"col-9"}>
                            <Form.Label>Choose the main area from your expertise areas that you will write about:</Form.Label>
                            <Form.Control as="select" value={selectedTag} onChange={(event) => handleTagSelect(event.target.value)} className="mb-3">
                                <option value="">Select a tag</option>
                                <option value="career">Career</option>
                                <option value="job-search">Job Search</option>
                                <option value="workplace">Workplace</option>
                                <option value="technology">Technology</option>
                                <option value="engineering">Engineering</option>
                                <option value="job-skills">Job Skills</option>
                                <option value="education">Education</option>
                                <option value="marketing">Marketing</option>
                            </Form.Control>
                        </Form.Group>
                        {selectedTag && (
                            <Form.Group className={"col-9"}>
                                <Form.Label>Choose the subtags the blog is about:</Form.Label>
                                <div className="mb-3">
                                    <Form.Check type="checkbox" label="Remote Work" />
                                </div>
                                <div className="mb-3">
                                    <Form.Check type="checkbox" label="Internships" />
                                </div>
                                <div className="mb-3">
                                    <Form.Check type="checkbox" label="Retirement" />
                                </div>
                                <div className="mb-3">
                                    <Form.Check type="checkbox" label="Freelancer" />
                                </div>
                            </Form.Group>
                        )}
                    </Col>
                </Row>

                <Row className={'my-4'}>
                    <Col className={'text-center'}>
                        <label htmlFor="image-upload">
                            {coverPhoto ? (
                                <Image
                                    src={URL.createObjectURL(coverPhoto)}
                                    alt="Selected"
                                    className={'w-100'}
                                />
                            ) : (
                                <div
                                    className={'d-flex align-items-center justify-content-center bg-secondary rounded w-100 h-100'}>
                                    <FontAwesomeIcon icon={faImage} size={'3x'}/>
                                </div>
                            )}

                            <input type="file" id="image-upload" onChange={handleImageChange}
                                   className={"visually-hidden"}/>
                        </label>
                    </Col>
                </Row>

                <Row className={'my-4'}>
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                        <Row className="mx-auto mb-2">
                            <label htmlFor="title" className={"display-6 fw-bold"}>Title</label>
                        </Row>
                        <Row className="w-100">
                            <div
                                id="title"
                                className="border border-dark rounded col-9 mx-auto p-1"
                                contentEditable="true"
                                style={{minHeight: '3em'}}
                                onBlur={(event) => setTitle(event.target.innerHTML)}
                                dangerouslySetInnerHTML={{__html: title}}
                            />
                        </Row>
                    </Col>
                </Row>

                <Row className={'my-4'}>
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                        <Row className="mx-auto mb-2">
                            <label htmlFor="summary" className={"display-6 fw-bold"}>Summary</label>
                        </Row>
                        <Row className="w-100">
                            <div
                                id="summary"
                                className="border border-dark rounded col-9 mx-auto p-1"
                                contentEditable="true"
                                style={{minHeight: '6em'}}
                                onBlur={(event) => setSummary(event.target.innerHTML)}
                                dangerouslySetInnerHTML={{__html: summary}}
                            />
                        </Row>
                    </Col>
                </Row>

                <Row className={'my-4'}>
                    <Col className="d-flex flex-column justify-content-center align-items-center">
                        <Row className="mx-auto mb-2">
                            <label htmlFor="content" className={"display-6 fw-bold"}>Content</label>
                        </Row>
                        <Row className="w-100">
                            <div
                                id="content"
                                className="border border-dark rounded col-9 mx-auto p-1"
                                contentEditable="true"
                                style={{minHeight: '30em'}}
                                onBlur={(event) => setContent(event.target.innerHTML)}
                                dangerouslySetInnerHTML={{__html: content}}
                            />
                        </Row>
                    </Col>
                </Row>

                <Row className={'my-4'}>
                    <Col className="d-flex justify-content-center">
                        <Button variant="success" className={'mx-2 col-9'} onClick={handlePublish}>Publish</Button>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default BlogEditor