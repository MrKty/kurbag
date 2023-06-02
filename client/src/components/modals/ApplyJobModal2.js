import {Badge, Button, Col, Modal, Row} from "react-bootstrap";
import React from "react";
const ApplyJobModal2 = ({ currentModal, handleCloseModal, handleApplyClick}) => {

    return (
        <Modal show={currentModal === 1} onHide={handleCloseModal} className={"modal-lg"}>
            <Modal.Header closeButton>
                <Modal.Title>Apply to Sony</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row><h5>Resume:</h5></Row>
                <div className="mb-3">
                    <label htmlFor="resume" className="btn btn-outline-primary fw-bold rounded-5">Upload
                        Resume</label>
                    <input type="file" className="form-control visually-hidden" id="resume"/>
                    <small className={"d-block text-muted"}>DOC, DOCX, PDF (2 MB)</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="coverLetter" className="form-label">Cover Letter</label>
                    <textarea className="form-control" id="coverLetter" rows="5"></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="coverLetter" className="form-label">Add Your Skills</label><br/>
                    <Badge bg="primary" className={"me-2"}>SQL</Badge>
                    <Badge bg="primary">DBMS</Badge>
                    <Row>
                        <Col className={"col-3 py-1"}>
                            <input type={"text"}     className={"d-block my-2 p-1"} placeholder={"Write new skill"}/>
                        </Col>
                        <Col className={"p-2 m-1"}>
                            <button className={"btn btn-primary"}>Add</button>
                        </Col>
                    </Row>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => {
                    handleCloseModal()
                    handleApplyClick(1)
                }}>
                    Back
                </Button>
                <Button variant="primary" onClick={() => {
                    handleCloseModal()
                    handleApplyClick(3)
                }}>Next</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ApplyJobModal2