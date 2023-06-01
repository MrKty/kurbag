import {Card, Col, Row} from "react-bootstrap";
import React from "react";

// Helper function to get month name from the month index
function getMonthName(monthIndex) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return months[monthIndex];
}

function formatDate(date) {
    const dateObj = new Date(date)
    return `${dateObj.getDate()} ${getMonthName(dateObj.getMonth())} ${dateObj.getFullYear()}`;

}

const EducationCard = ({institutionLogo, institutionName, degree, startDate, endDate}) => {

    const formatted_end_date = formatDate(endDate);
    const formatted_start_date = formatDate(startDate);

    return (
        <Card className="mb-3">
            <Card.Body>
                <Row>
                    <Col xs={3} md={2}>
                        <img src={institutionLogo} alt="Company Logo" className="img-fluid"/>
                    </Col>
                    <Col xs={9} md={10}>
                        <h5>{institutionName}</h5>
                        <p>{degree}</p>
                        <p>
                            {startDate} - {endDate}
                        </p>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

export default EducationCard;