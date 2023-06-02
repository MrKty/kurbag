import {Container, Row, Col, Button, Card} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import OrganizationNavBar from "../components/OrganizationNavBar";
import FilterBar from "../components/FilterBar";
import {useEffect, useState} from "react";
import sendRequest from "../utils/request";

const OrganizationEmployeePage = () => {
    const [employees, setEmployees] = useState([]);

    const fetch = () => {
        sendRequest('get-org-employee-list', 'POST', {}, (data) => {
            if (data.employees) {
                console.log(employees)
                setEmployees(data.employees)
            }
        })
    }

    useEffect(() => {
        fetch()
    }, []);

    const handleMakeRecruiter = (employeeId) => {
        // implementation for making employee a recruiter
        sendRequest('make-employee-recruiter', 'POST', {employeeId}, (data) => {
            alert(data.message)
        });
        fetch()
        console.log(`Make ${employeeId} a recruiter`);
    };

    return (
        <Container fluid>
            <OrganizationNavBar/>
            <FilterBar filters={["Position", "Year Of Experience"]}/>
            <Card className={"mx-4 mt-3 mb-3"}>
                {employees.map((employee, index) => (
                    <Row key={index} className="p-2 m-1 align-items-center border-bottom border-3">
                        <Col xs={3} sm={3} md={2}>
                            <FontAwesomeIcon icon={faUser} size="2x" className="d-none"/>
                            <img src={employee.photo} alt={employee.name} className={"rounded-circle border border-2"}
                                 style={{maxHeight: "100px"}}/>
                        </Col>
                        <Col xs={9} sm={6} md={7}>
                            <div className="fw-bold">Name: <a href="#" className={"no-underline"}>{employee.name}</a>
                            </div>
                            <div><span className="fw-bold">Position:</span> {employee.position}</div>
                            <div><span className="fw-bold">Working Since: </span> {employee.workingSince}</div>
                        </Col>
                        <Col xs={12} sm={3} md={3}>
                            {employee.userType === 0 ?
                                <Button variant="primary" onClick={() => handleMakeRecruiter(employee.id)}>
                                    <FontAwesomeIcon icon={faUserPlus}/>
                                    <span className="ms-2">Make Recruiter</span>
                                </Button> : <div className={"fw-bold"}>Employee is already recruiter</div>}

                        </Col>

                    </Row>

                ))}
            </Card>
        </Container>
    );
};

export default OrganizationEmployeePage