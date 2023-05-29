import {Button, Card, Col, Form, Modal, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import React from "react";
const ApplyJobModal4 = ({ currentModal, handleCloseModal, handleApplyClick}) => {

    return (
        <Modal show={currentModal === 3} onHide={handleCloseModal} className={"modal-lg"}>
            <Modal.Header closeButton>
                <Modal.Title>Apply to Sony</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row><h5>Photo:</h5></Row>
                <div className="mb-3">
                    <label htmlFor="photo" className="btn btn-outline-primary fw-bold rounded-5">Upload
                        Photo</label>
                    <input type="file" className="form-control visually-hidden" id="photo"/>
                    <small className={"d-block text-muted"}>JPEG, JPG, PNG (5 MB)</small>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    handleCloseModal()
                    handleApplyClick(2)
                }}>
                    Back
                </Button>
                <Button variant="primary" onClick={() => {
                    handleCloseModal()
                    handleApplyClick(4)
                }}>Next</Button>
            </Modal.Footer>
        </Modal>

        )

};

export default ApplyJobModal4