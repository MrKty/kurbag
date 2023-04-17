import {Navbar, Container, Nav, NavDropdown, Form, InputGroup, Button, Image} from 'react-bootstrap';
import logo from '../icons/app_logo.svg';
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
import React from "react";


const NavBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/"><Image src={logo} alt="Logo" className={"logo-image rounded-3"}/></Navbar.Brand>
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
                        <Nav.Link href="/" className="d-flex align-items-center me-2">
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faHome} size="2x"/>
                                <div className="mt-1">Home Page</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link href="/Blogs" className="d-flex align-items-center me-2">
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faBlog} size="2x"/>
                                <div className="mt-1">Blogs</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link href="/jobs" className="d-flex align-items-center me-2">
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faBriefcase} size="2x"/>
                                <div className="mt-1">Jobs</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link href="#" className="d-flex align-items-center me-2">
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
                                    <NavDropdown.Item href="#">Option 1</NavDropdown.Item>
                                    <NavDropdown.Item href="#">Option 2</NavDropdown.Item>
                                    <NavDropdown.Item href="#">Option 3</NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        </Nav.Link>

                        <Nav.Link href="#" className="d-flex align-items-center me-2">
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faBell} size="2x"/>
                                <div className="mt-1">Notifications</div>
                            </div>
                        </Nav.Link>
                        <Nav.Link href="#" className="d-flex align-items-center mt-2">
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faUser} size="2x"/>
                                <NavDropdown
                                    title={"Profile"}
                                    id="basic-nav-dropdown"
                                    menuAlign="right"
                                >
                                    <NavDropdown.Item href="#">Profile 1</NavDropdown.Item>
                                    <NavDropdown.Item href="#">Profile 2</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="#">Logout</NavDropdown.Item>
                                </NavDropdown>
                            </div>
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;