import {Navbar, Container, Nav, NavDropdown, Form, InputGroup, Button, Image} from 'react-bootstrap';
import logo from '../icons/app_logo.svg';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faHome,
    faBriefcase,
    faBell,
    faBuilding,
    faSearch,
    faUsers
} from '@fortawesome/free-solid-svg-icons';
import React from "react";


const OrganizationNavBar = (props) => {

    const handleDropdownClick = (type) => {
        props.handleClick(type);
    };

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

                        <Nav.Link href="/org-employees" className="d-flex align-items-center me-2">
                            <div className="d-flex flex-column">
                                <FontAwesomeIcon icon={faUsers} size="2x"/>
                                <div className="mt-1">Employees</div>
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
                                <FontAwesomeIcon icon={faBuilding} size="2x"/>
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

export default OrganizationNavBar;