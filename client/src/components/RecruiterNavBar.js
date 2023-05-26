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
    const [activeLink, setActiveLink] = useState('cv-pool');

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    const handleReturnClick = () => {
        props.handleClick(0); // Set the user type to 0 (normal user)
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">
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
                            href="/home"
                            className={`d-flex align-items-center me-2 ${activeLink === 'home' ? 'active-link' : ''}`}
                            onClick={() => handleLinkClick('home')}>
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faAdd} size="2x" />
                                <div className="mt-1">New Expertise Request</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link
                            href="/previous-blogs"
                            className={`d-flex align-items-center me-2 ${activeLink === 'previous-blogs' ? 'active-link' : ''}`}
                            onClick={() => handleLinkClick('previous-blogs')}>
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faBook} size="2x" />
                                <div className="mt-1">Previous Blogs</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link
                            href="/write-blog"
                            className={`d-flex align-items-center me-2 ${activeLink === 'write-blog' ? 'active-link' : ''}`}
                            onClick={() => handleLinkClick('write-blog')}>
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faFileAlt} size="2x" />
                                <div className="mt-1">Write New Blog</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link
                            href="/approve-applications"
                            className={`d-flex align-items-center me-2 ${activeLink === 'approve-applications' ? 'active-link' : ''}`}
                            onClick={() => handleLinkClick('approve-applications')}>
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faCheckCircle} size="2x" />
                                <div className="mt-1">Approve Pending Applications</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link href="#" className="d-flex align-items-center me-2" onClick={handleReturnClick}>
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