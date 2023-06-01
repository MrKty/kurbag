import {Navbar, Container, Nav, NavDropdown, Form, InputGroup, Button, Image, Alert} from 'react-bootstrap';
import logo from '../icons/app_logo.svg';
import React, {useEffect, useState} from "react";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faHome,
    faBlog,
    faBriefcase,
    faEnvelope,
    faBell,
    faUser,
    faSearch,
    faExchangeAlt
} from '@fortawesome/free-solid-svg-icons';
import CareerExpertModal from "./modals/CareerExpertModal";
import sendRequest from "../utils/request";



const NavBar = (props) => {
    const [activeLink, setActiveLink] = useState(props.activeLink);
    const [showModal, setShowModal] = useState(false);
    const [userType, setUserType] = useState(0);

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const handleOptionClick = () => {
        console.log(userType)
        if (userType == "1" || userType == "3") {
            window.location.href = '/previous-blogs';
        } else {
            setShowModal(true);
        }
    };

    useEffect( () => {
        setUserType(localStorage.getItem("userType"));
    }, []);


    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/home"><Image src={logo} alt="Logo" className={"logo-image rounded-3"}/></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form className={"col-5 me-auto"}>
                        <InputGroup className="mb-3">
                            <Form.Control type="search" placeholder="Search Anything" aria-label="Search"/>
                            <Button variant="outline-secondary">
                                <FontAwesomeIcon icon={faSearch}/>
                            </Button>
                        </InputGroup>
                    </Form>
                    <Nav>
                        <Nav.Link
                            href="/Home"
                            className={`d-flex align-items-center me-2 ${activeLink === 'home' ? 'active-link' : ''}`}
                            onClick={() => handleLinkClick('home')}>
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faHome} size="2x"/>
                                <div className="mt-1">Home Page</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link
                            href="/Blogs"
                            className={`d-flex align-items-center me-2 ${activeLink === 'blogs' ? 'active-link' : ''}`}
                            onClick={() => handleLinkClick('blogs')}>
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faBlog} size="2x"/>
                                <div className="mt-1">Blogs</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link
                            href="/jobs"
                            className={`d-flex align-items-center me-2 ${activeLink === 'jobs' ? 'active-link' : ''}`}
                            onClick={() => handleLinkClick('jobs')}>
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faBriefcase} size="2x"/>
                                <div className="mt-1">Jobs</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link
                            href="/messages"
                            className={`d-flex align-items-center me-2 ${activeLink === 'messages' ? 'active-link' : ''}`}
                            onClick={() => handleLinkClick('messages')}>
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faEnvelope} size="2x"/>
                                <div className="mt-1">Messaging</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link href="#" className="d-flex align-items-center me-2 mt-2">
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faExchangeAlt} size="2x"/>
                                <NavDropdown
                                    title={"Switch View"}
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item onClick={handleOptionClick}>
                                        Career Expert
                                    </NavDropdown.Item>
                                    {userType >= 2 && <NavDropdown.Item onClick={() => window.location.href = "/cv-pool"}>
                                        Recruiter
                                    </NavDropdown.Item>}
                                </NavDropdown>
                            </div>
                        </Nav.Link>
                        <Nav.Link href="/notifications"
                                  className={`d-flex align-items-center me-2 ${activeLink === 'notifications' ? 'active-link' : ''}`}
                                  onClick={() => handleLinkClick('notifications')}>
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faBell} size="2x"/>
                                <div className="mt-1">Notifications</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link href="/profile" className="d-flex align-items-center mt-2">
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faUser} size="2x"/>
                                <NavDropdown
                                    title={"Profile"}
                                    id="basic-nav-dropdown"
                                    menuAlign="right"
                                >
                                    <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="#">Logout</NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        </Nav.Link>
                    </Nav>
                    <CareerExpertModal showModal={showModal} handleClose={handleClose}/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;