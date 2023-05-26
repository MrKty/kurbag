import {Card, Col, Image, Row, Container} from "react-bootstrap";
import React from "react";
import FilterBar from "../components/FilterBar";
import RecruiterNavBar from "../components/RecruiterNavBar";
import CvCard from "../components/CvCard";

// sample cv's are like a summary of a cv
// they will only have name, sector, position, years of experience, current Employer
const sampleCv = [
    {
        "name": "Mert Unlu",
        "sector": "Software",
        "position": "Full-Stack Developer",
        "experience": "5 years",
        "currentEmployer": "None"
    },
    {
        "name": "John Doe",
        "sector": "Marketing",
        "position": "Marketing Manager",
        "experience": "8 years",
        "currentEmployer": "ABC Company"
    },
    {
        "name": "Jane Smith",
        "sector": "Finance",
        "position": "Financial Analyst",
        "experience": "6 years",
        "currentEmployer": "XYZ Bank"
    },
    {
        "name": "Alex Johnson",
        "sector": "Sales",
        "position": "Sales Representative",
        "experience": "3 years",
        "currentEmployer": "DEF Corporation"
    },
    {
        "name": "Emily Davis",
        "sector": "Human Resources",
        "position": "HR Manager",
        "experience": "9 years",
        "currentEmployer": "GHI Company"
    },
    {
        "name": "Michael Wilson",
        "sector": "Engineering",
        "position": "Mechanical Engineer",
        "experience": "7 years",
        "currentEmployer": "LMN Engineering"
    },
    {
        "name": "Sarah Thompson",
        "sector": "Education",
        "position": "Teacher",
        "experience": "4 years",
        "currentEmployer": "PQR School"
    },
    {
        "name": "David Roberts",
        "sector": "Healthcare",
        "position": "Registered Nurse",
        "experience": "10 years",
        "currentEmployer": "STU Hospital"
    },
    {
        "name": "Olivia Anderson",
        "sector": "Design",
        "position": "Graphic Designer",
        "experience": "5 years",
        "currentEmployer": "VWX Agency"
    }
];


const CvPool = () => {

    const handleClick = () => {

    };

    return (
        <Container className="" style={{overflowY:"auto", maxHeight:"700px"}}>
            <RecruiterNavBar handleClick={handleClick} activeLink="approve-applications" />
            <FilterBar filters={["Date", "Main Tag"]} />
            <div className="center-wrapper">
                {sampleCv.map((cv) => (
                    <Col className="mt-2 mb-2" key={cv.id} md={8}>
                        <CvCard
                            name={cv.name}
                            sector={cv.sector}
                            position={cv.position}
                            experience={cv.experience}
                            currentEmployer={cv.currentEmployer}
                        />
                    </Col>
                ))}
            </div>
        </Container>
    );

};

export default CvPool