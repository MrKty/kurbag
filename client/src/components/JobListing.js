import {Col, Image, Row} from "react-bootstrap";
import React from "react";

const JobListing = ({ position, company, location, image, description, isSelected, onClick }) => (
    <Row
        className={`border-bottom p-2 ${isSelected ? 'selected' : ''}`}
        style={{ backgroundColor: isSelected ? 'white' : '#ecebeb' }}
        onClick={onClick}
    >
        <Col md={3}>
            <Image src={image} fluid rounded />
        </Col>
        <Col md={9}>
            <h5>{position}</h5>
            <p className="mb-1">{company}</p>
            <p className="mb-0">{location}</p>
        </Col>
    </Row>
);

export default JobListing