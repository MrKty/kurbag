import React from "react";
import { Col, Image, Row } from "react-bootstrap";

const JobListing = ({ jobTitle, companyName, companyLogo , location, isSelected, onClick }) => (
    <Row
        className={`border-bottom p-2 ${isSelected ? 'selected' : ''}`}
        style={{ backgroundColor: isSelected ? 'white' : '#ecebeb' }}
        onClick={onClick}
    >
        <Col md={4}>
            <Image src={companyLogo} className={"img-fluid"} />
        </Col>
        <Col md={8}>
            <h5>{jobTitle}</h5>
            <p className="mb-1">{companyName}</p>
            <p className="mb-0">{location}</p>
        </Col>
    </Row>
);

export default JobListing;
