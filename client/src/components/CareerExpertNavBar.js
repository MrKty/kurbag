import React, { useState } from "react";
import { Navbar, Container, Nav, Image, Form, InputGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFileAlt, faCheckCircle, faExchangeAlt, faBook, faSearch, faAdd} from '@fortawesome/free-solid-svg-icons';
import logo from '../icons/app_logo.svg';

const CareerExpertNavBar = (props) => {
    const [selectedLink, setSelectedLink] = useState(props.underlined);

    const handleLinkClick = (link) => {
        setSelectedLink(link);
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
                    <Form className={"col-5 me-auto"}>
                        <InputGroup className="mb-3">
                            <Form.Control type="search" placeholder="Search Anything" aria-label="Search" />
                            <Button variant="outline-secondary">
                                <FontAwesomeIcon icon={faSearch} />
                            </Button>
                        </InputGroup>
                    </Form>
                    <Nav className="ms-auto">
                        <Nav.Link href="blogs" className={"d-flex align-items-center me-2" + (selectedLink === "/career-expert/blogs" ? " border-bottom border-dark" : "")} onClick={() => handleLinkClick("/career-expert/blogs")}>
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faBook} size="2x" />
                                <div className="mt-1">Previous Blogs</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link href="write-blog" className={"d-flex align-items-center me-2" + (selectedLink === "/career-expert/write-blog" ? " border-bottom border-dark" : "")} onClick={() => handleLinkClick("/career-expert/write-blog")}>
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faFileAlt} size="2x" />
                                <div className="mt-1">Write New Blog</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link href="/approve-applications" className={"d-flex align-items-center me-2" + (selectedLink === "/career-expert/approve-applications" ? " border-bottom border-dark" : "")} onClick={() => handleLinkClick("/career-expert/approve-applications")}>
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

export default CareerExpertNavBar;