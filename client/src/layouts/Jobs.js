import {Row, Col, Image, Container, Badge, Button, Card, Navbar, Modal, Form} from 'react-bootstrap';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faAdd,
    faAngleDown,
    faAngleUp,
    faEnvelope,
    faPaperPlane,
    faPlus,
    faSave,
    faCheck //kullan bunu apply edince
} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import React, {useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import FilterBar from "../components/FilterBar";
import CareerExpertModal from "../components/modals/CareerExpertModal";
import JobDescription from "../components/JobDescription";
import JobListing from "../components/JobListing";


const data = [
    {
        position: 'Data Analyst',
        company: 'Nokia',
        location: 'Istanbul, Turkey (remote)',
        image: 'https://media.licdn.com/dms/image/C4E0BAQGL8hpduEqGKQ/company-logo_100_100/0/1677420438777?e=1689811200&v=beta&t=uq7I20tbAw4q7rAxupek6VeDqkMf_0FUr2sKi-elvTw',
    },
    {
        position: 'Data Analyst',
        company: 'Sony',
        location: 'Istanbul, Turkey (remote)',
        image: 'https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ',
    },
    {
        position: 'SQL Developer',
        company: 'IBM',
        location: 'New York, NY (remote)',
        image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAmVBMVEUPYv4AWf4AXf4AW/4FYP75+PT29vT++/MAVf81dfxxlPutvvje4/WDpPr+/PPm7PS7zPeuwviXsfkAVP/M1/a1x/jD0vbr7/Q6ePwobv0QZ/6JqPmTrvmNq/mywvjj6fWguPlSgvzW4PZxmPvh5fVJfP1ljvs2cv0gav19oPqiu/h5m/rP2vbH1Pa5yvcqb/1oj/tRgfxbifzVTzbpAAAFrklEQVR4nO2aW3eqOhSFIYmKuxWtbq1CLSpea9vT7f//cYdrEnOrL2DH6PyehLVYMEVXkgmeBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD4GfgWiCOWQQmTq5Cg5CpFO5UhqXmBi+mTkemJeP6bOZYzPh8m4vLI+f3jY5Yxyvj8nGZkFRSJ/uxvkTSSk/5rWiDrhx0jvSffmwzNsTKhN1xFtUa67HW1jOfrG8TWYVdLCudMv6gfojC/vM6gEkFfDGXCPZFP5T+ZchpX6C1eH4y8nolHV+aYYJqWIsjeUCYvIUHisc7q2LhCZ6ehjlYjsorLdwUrqInmBf4CjN9sBnHE9NvA7KEKS0bj+lj/eWjk+c33go05pmRGzKMDY5lnxiWSizmj30Iv7RrpZL00SDrm4HVm9l3QuGcK9c78HvlTY61WRouekXCaKRyaYwpdwujSWCZ8D7hC83laUBilf8ysmUe+LLFr0iNjc0usvn52NJ8njRpvpoxYyM9si+mptjLfnqe90YIJboyZ9jIdW6BhPTrzfs1CPTk78NhBxBZ9fS+LRJmSuVfE2LGvBdqFRbwRhCt1RRNs62CYiM4xFUfM6iPIWe0n4bLopsFMCxzb0laSKeTNf6wp3PDm/igUPvHunw8XJSRVB43OJj+CMW2ouKtCdZ4hKdxw9bJCvhAkqaakkw/p5HR3hdm3bO9uckxqKsZ+aOuV+v7WW42ryX3XS82pP6yXMuNsuYI4J97EXEaOfzMpbwPmxYOK+KKem5wHDmJpncvmsR7fEz8ev+Qsc+KcbHfzk5lrhRF3GMI3rZc+9lxWhuRVkFSUmVUfe8NgUe8NP0W8hcW9opCvB/TxcONYYoSrQGRKo0WPt9VwF1fFO1uxBGlfYfJYsV2qo4U/2z7a2D5MpEzyxcsku1F11DZ+eP9b8D448UpJywo9FnD0Zbcf2Lm+4UQEGD+Kik9Uircl7dfArA6Z5zT3FeteKsPkjXoXkTdahUWl154xO6sS/beRldkgkMtcRJl/dD1TciOaivj9RgtjL3UMFicpXR4t9oQpqRtfssbvMFrwUxsUOsfDnbjUa4XB6Oq4cEDp+H4KPe7Kv/5Rf6V07DL2X6XRha1FmR1j/66s/teIka9XaatVhe5O4zb3qbkM89RWw7w7dppfwK330LiTmMoU98hXku45Wgy3FYlh1pbUwQ+xxl/xnUnKn0B9iZ35EiV43/LtfEJPBzw+bH+0uGXm3TH6NOIIaeYdXkj+NYjtfAlCX8R21Jq4ArfX9viN1zYSCsXOXBGb8+1uPkPPRgseb1mh5wnTfaetgPc8tucxthbWPF8zswMvky6KQ/lzgXXxDE6Y/2lLuiQZDp/d5NKbnSimZio5WrwNDEY8d4psMT3VUkBEbCdrQaHqw3NzP3/0dhPzyGNHzc6vemX5RGB+rMx93fVvGufzw8mzJXid2YsMzw8r+4YOikBYPuqVOk2d1sIzYOPD2/IZ8CSx+zNS5jTIhKhWTu9S/tOiYmtT9mD6oqU1r3AeWijv4S0cmJfdQ5XKggs+8o1qFpHdQ5Xm3xhilnZSRG7qNV7VJo17vfwT37CnNSrReuW39lJzmav69rO1INBl1rvtfNnS18sIiZLv70hrTOBR9+Erc5945OSy83OW1XKZrcfj2revXPv6wTBbxAM+Nl60tMaX+tZ3E8Pi3USXfZHlhNPqZ0ZjtYww+2mXr0gkF6NOu+8bQxPHG0P5C6azde3r6m8MhZdaoT/lqytpbVGnNa/wkOhWfeHFr2i+vLO5+ZvRQxoF/A9GTmqZREzHd3wpSAdqweTQ/B/RZtfnI5jLzb/2AoiWIPdP/pE60gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAd+V/tFep6yuXWjYAAAAASUVORK5CYII="
    },

    {
        position: 'Database Administrator',
        company: 'Microsoft',
        location: 'Seattle, WA (remote)',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAOVBMVEXxURuAzCgAre/7vAn////xTxeCzTCFzjjxVifxWjAksO/7viYZru/7vRvxTRLxVCPyXziIzj/7vzAS7Np6AAABD0lEQVR4nO3P2xGCUBAFwVXBtyLkH6yf3giOtdqTwFRXpZrP06fjLlYMSEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhI2FE4p3ouXxJeYr0G4XqKVdOvR9g/wv4R9o+wf4T9q2uuYbvdYtU+1n0QPg6xCAkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCf9Z+Abf/3bA/sfZagAAAABJRU5ErkJggg==',
    },

    {
        position: 'Data Engineer',
        company: 'Amazon',
        location: 'San Francisco, CA (remote)',
        image: 'data:image/png;base64,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',
    }
    // more data objects here...
];


const Jobs = () => {

    const [showModal, setShowModal] = useState(false);
    const [userType, setUserType] = useState(0);
    const [maxHeight, setMaxHeight] = useState(window.innerHeight);
    const [selectedJob, setSelectedJob] = useState(null);

    const handleJobClick = (job) => {
        setSelectedJob(job);
    };

    useEffect(() => {
        const handleResize = () => {
            setMaxHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleClose = () => {
        setShowModal(false);
    };

    return (
        <Container fluid className="p-1">
            <NavBar activeLink="jobs"/>
            <FilterBar
                filters={["Date posted", "Experience level", "Company", "Job Type", "On-site/Remote", "Location", "Industry", "Job Title"]}/>
            <Row className="flex-grow-1">
                <Col className="col-3 mt-3 me-2" style={{overflowY:"scroll", maxHeight: maxHeight}}>
                    <Card className={"border p-2"} style={{overflowY:"auto", maxHeight: maxHeight}}>
                        <Row>
                            <Col className={"col-9"}>
                                <h4>Saved Jobs</h4>
                            </Col>
                            <Col>
                                <FontAwesomeIcon icon={faAngleUp} className={"px-2"}/>
                            </Col>
                        </Row>
                        <Row>
                            <Col className={"col-9"}>
                                <h4>Applied Jobs</h4>
                            </Col>
                            <Col>
                                <FontAwesomeIcon icon={faAngleDown} className={"px-2"}/>
                            </Col>
                        </Row>
                        <Row className="border-bottom p-2">
                            <Col md={3}>
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/009/469/630/non_2x/google-logo-isolated-editorial-icon-free-vector.jpg"
                                    alt="Profile"
                                    className="rounded"
                                    width="75"
                                    height="75"
                                />
                            </Col>
                            <Col md={9}>
                                <Row><h5>Web Developer</h5></Row>
                                <Row>
                                    <Col>
                                        <p className="mt-2 me-auto fw-bold">Google</p>
                                    </Col>
                                    <Col>
                                        <button className={"btn btn-info fw-bold"} style={{color: "white"}}>Pending
                                        </button>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={3}>
                                <img
                                    src="https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ"
                                    alt="Profile"
                                    className="rounded"
                                    width="75"
                                    height="75"
                                />
                            </Col>
                            <Col md={9}>
                                <Row><h5>Data Analyst</h5></Row>
                                <Row>
                                    <Col>
                                        <p className="mt-2 me-auto fw-bold">Sony</p>
                                    </Col>
                                    <Col>
                                        <button className={"btn btn-info fw-bold"} style={{color: "white"}}>Pending
                                        </button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </Col>
                <Col className="col-3 mt-3 mx-3" style={{overflowY: 'auto', maxHeight: maxHeight}}>
                    {data.map((job) => (
                        <JobListing
                            key={job.position}
                            position={job.position}
                            company={job.company}
                            location={job.location}
                            image={job.image}
                            isSelected={selectedJob === job}
                            onClick={() => handleJobClick(job)}
                        />
                    ))}
                </Col>
                <Col className="col-5 mt-3 p-2" style={{backgroundColor: "#ecebeb", overflowY:"auto", maxHeight: maxHeight}}>
                    <JobDescription
                        position="Data Analyst"
                        company="Sony"
                        companyLocation="Istanbul, Turkey"
                        jobLocation="Remote"
                        postingDate="April 19, 2023"
                        jobType="Full-time"
                        aboutJob="We are seeking a highly analytical Data Analyst to join our team. You will be responsible for analyzing large data sets and providing insights to help guide business decisions."
                        aboutHiringManager="The hiring manager for this position is John Smith. He has been with the company for 5 years and is excited to welcome a new member to the team."
                        aboutCompany="Sony is a leading gaming company that creates innovative and engaging games for players around the world. We are passionate about what we do and are always looking for talented individuals to join our team."
                        companyLogo="https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ"
                    />
                </Col>
            </Row>
            <CareerExpertModal showModal={showModal} handleClose={handleClose}/>
        </Container>
    );
}
export default Jobs