import {Button, Col, Modal, Row} from "react-bootstrap";
import React from "react";

const ApplyJobModal1 = ({ currentModal, handleCloseModal, handleApplyClick}) => {



    return (
        <Modal show={currentModal === 0} onHide={handleCloseModal} className={"modal-lg"}>
            <Modal.Header closeButton>
                <Modal.Title>Apply to Sony</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row><h5>Contact Info:</h5></Row>
                <div className="d-flex align-items-center mb-3">
                    <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Profile photo"
                         className="rounded-circle me-3" style={{width: "100px"}}/>
                    <Row>
                        <Row className={"my-2"}>
                            <Col className={"col-4 align-self-center visually-hidden"}>First name:</Col>
                            <Col><input type="text" className="form-control" placeholder="Enter first name"/></Col>
                        </Row>
                        <Row>
                            <Col className={"col-4 visually-hidden"}>Last name:</Col>
                            <Col><input type="text" className="form-control" placeholder="Enter last name"/></Col>
                        </Row>
                    </Row>
                </div>
                <div>
                    <div>Phone:</div>
                    <div className="d-flex align-items-center mb-2">
                        <input type="text" className="form-control" placeholder="Enter Mobile Phone Number"/>
                    </div>
                    <div>Email:</div>
                    <input type="email" className="form-control mb-2" placeholder="Enter Email Address"/>
                    <div>Summary:</div>
                    <textarea className="form-control mb-2" style={{resize: "none"}}
                              placeholder="Enter About Yourself"/>
                    <div>Headline:</div>
                    <input type="text" className="form-control" placeholder="Enter Headline"/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => {
                    handleCloseModal();
                    handleApplyClick(1);
                }}>Next</Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ApplyJobModal1