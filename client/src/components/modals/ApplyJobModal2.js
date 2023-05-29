import {Button, Modal, Row} from "react-bootstrap";
import React from "react";

const ApplyJobModal2 = ({ currentModal, handleCloseModal, handleApplyClick}) => {



    return (
        <Modal show={currentModal === 1} onHide={handleCloseModal} className={"modal-lg"}>
            <Modal.Header closeButton>
                <Modal.Title>Apply to Sony</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row><h5>Home Address:</h5></Row>
                <div className="mb-3">
                    <label htmlFor="streetAddressLine1" className="form-label">
                        Street Address Line 1
                    </label>
                    <input type="text" className="form-control" id="streetAddressLine1"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="streetAddressLine2" className="form-label">
                        Street Address Line 2
                    </label>
                    <input type="text" className="form-control" id="streetAddressLine2"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="city" className="form-label">
                        City
                    </label>
                    <input type="text" className="form-control" id="city"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="zipCode" className="form-label">
                        ZIP / Postal Code
                    </label>
                    <input type="text" className="form-control" id="zipCode"/>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={() => {
                        handleCloseModal();
                        handleApplyClick(0);
                    }}
                >
                    Back
                </Button>
                <Button
                    variant="primary"
                    onClick={() => {
                        handleCloseModal();
                        handleApplyClick(2);
                    }}
                >
                    Next
                </Button>
            </Modal.Footer>
        </Modal>
    )
};

export default ApplyJobModal2
