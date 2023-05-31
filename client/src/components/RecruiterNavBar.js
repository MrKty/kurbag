import {Navbar, Container, Nav, NavDropdown, Form, InputGroup, Button, Image} from 'react-bootstrap';
import logo from '../icons/app_logo.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faHome,
    faBriefcase,
    faBell,
    faBuilding,
    faSearch,
    faUsers, faBook, faFileAlt, faCheckCircle, faExchangeAlt, faPlusCircle, faAdd
} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from "react";


const RecruiterNavBar = (props) => {
    const [activeLink, setActiveLink] = useState(props.activeLink);

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/home">
                    <Image src={logo} alt="Logo" className={"logo-image rounded-3"} />
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Form className={"col-4 me-auto"}>
                        <InputGroup className="mb-3">
                            <Form.Control type="search" placeholder="Search Anything" aria-label="Search" />
                            <Button variant="outline-secondary">
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </InputGroup>
                    </Form>
                    <Nav className="ms-auto">
                        <Nav.Link
                            href="/cv-pool"
                            className={`d-flex align-items-center me-2 ${activeLink === 'cv-pool' ? 'active-link' : ''}`}
                            onClick={() => handleLinkClick('cv-pool')}>
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faUsers} size="2x"/>
                                <div className="mt-1">CV Pool</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link
                            href="/create-job"
                            className={`d-flex align-items-center me-2 ${activeLink === 'create-job' ? 'active-link' : ''}`}
                            onClick={() => handleLinkClick('create-job')}>
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faUsers} size="2x"/>
                                <div className="mt-1">Create Job</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link
                            href="/cv-pool"
                            className={`d-flex align-items-center me-2 ${activeLink === 'cv-pool' ? 'active-link' : ''}`}
                            onClick={() => handleLinkClick('cv-pool')}>
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faBriefcase} size="2x"/>
                                <div className="mt-1">Posted Jobs</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link
                            href="/recruiter-view"
                            className={`d-flex align-items-center me-2 ${activeLink === 'recruiter-view' ? 'active-link' : ''}`}
                            onClick={() => handleLinkClick('recruiter-view')}>
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faPlusCircle} size="2x"/>
                                <div className="mt-1">Approve Pending Applications</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link href="home" className="d-flex align-items-center me-2">
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faExchangeAlt} size="2x" />
                                <div className="mt-1">Return to Normal View</div>
                            </div>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default RecruiterNavBar;