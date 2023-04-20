import {Navbar, Container, Nav, NavDropdown, Form, InputGroup, Button, Image} from 'react-bootstrap';
import logo from '../icons/app_logo.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faHome,
    faBriefcase,
    faBell,
    faBuilding,
    faSearch,
    faUsers, faBook, faFileAlt, faCheckCircle, faExchangeAlt, faPlusCircle
} from '@fortawesome/free-solid-svg-icons';
import React, {useState} from "react";


const RecruiterNavBar = (props) => {
    const [selectedLink, setSelectedLink] = useState("/career-expert/write-blog");

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
                    <Image src={logo} alt="Logo" className={"logo-image rounded-3"}/>
                </Navbar.Brand>
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
                    <Nav className="ms-auto">
                        <Nav.Link href="blogs"
                                  className={"d-flex align-items-center me-2" + (selectedLink === "/career-expert/blogs" ? " border-bottom border-dark" : "")}
                                  onClick={() => handleLinkClick("/career-expert/blogs")}>
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faUsers} size="2x"/>
                                <div className="mt-1">CV Pool</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link href="write-blog"
                                  className={"d-flex align-items-center me-2" + (selectedLink === "/career-expert/write-blog" ? " border-bottom border-dark" : "")}
                                  onClick={() => handleLinkClick("/career-expert/write-blog")}>
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faBriefcase} size="2x"/>
                                <div className="mt-1">Posted Jobs</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link href="/approve-applications"
                                  className={"d-flex align-items-center me-2" + (selectedLink === "/career-expert/approve-applications" ? " border-bottom border-dark" : "")}
                                  onClick={() => handleLinkClick("/career-expert/approve-applications")}>
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faPlusCircle} size="2x"/>
                                <div className="mt-1">Post New Job</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link href="#" className="d-flex align-items-center me-2" onClick={handleReturnClick}>
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faExchangeAlt} size="2x"/>
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