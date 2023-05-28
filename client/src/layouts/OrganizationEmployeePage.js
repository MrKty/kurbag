import {Container, Row, Col, Button, Card} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUser, faUserPlus} from '@fortawesome/free-solid-svg-icons';
import OrganizationNavBar from "../components/OrganizationNavBar";
import FilterBar from "../components/FilterBar";

const OrganizationEmployeePage = () => {
    // dummy data for illustration purposes
    const employees = [
        {
            id: 1,
            name: 'John Doe',
            position: 'Software Engineer',
            workingSince: '01.01.2020',
            photo: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        {
            id: 2,
            name: 'Jane Smith',
            position: 'Product Manager',
            workingSince: '15.02.2021',
            photo: 'https://randomuser.me/api/portraits/women/2.jpg'
        },
        {
            id: 3,
            name: 'Bob Johnson',
            position: 'Marketing Specialist',
            workingSince: '10.03.2019',
            photo: 'https://randomuser.me/api/portraits/men/3.jpg'
        },
        {
            id: 4,
            name: 'Alice Lee',
            position: 'UX Designer',
            workingSince: '20.05.2020',
            photo: 'https://randomuser.me/api/portraits/women/4.jpg'
        },
        {
            id: 5,
            name: 'James Brown',
            position: 'Data Analyst',
            workingSince: '02.08.2018',
            photo: 'https://randomuser.me/api/portraits/men/5.jpg'
        },
        {
            id: 6,
            name: 'Emily Wang',
            position: 'Graphic Designer',
            workingSince: '13.09.2022',
            photo: 'https://randomuser.me/api/portraits/women/6.jpg'
        },
        {
            id: 7,
            name: 'Mike Patel',
            position: 'Sales Manager',
            workingSince: '05.12.2017',
            photo: 'https://randomuser.me/api/portraits/men/7.jpg'
        },
        {
            id: 8,
            name: 'Sarah Kim',
            position: 'Software Engineer',
            workingSince: '30.01.2021',
            photo: 'https://randomuser.me/api/portraits/women/8.jpg'
        },
        {
            id: 9,
            name: 'Alex Rodriguez',
            position: 'Marketing Manager',
            workingSince: '11.04.2019',
            photo: 'https://randomuser.me/api/portraits/men/9.jpg'
        },
        {
            id: 10,
            name: 'Lily Chen',
            position: 'Product Designer',
            workingSince: '07.06.2020',
            photo: 'https://randomuser.me/api/portraits/women/10.jpg'
        },
    ];

    const handleMakeRecruiter = (employeeId) => {
        // implementation for making employee a recruiter
        console.log(`Make ${employeeId} a recruiter`);
    };

    return (
        <Container fluid>
            <OrganizationNavBar/>
            <FilterBar filters={["Position", "Year Of Experience"]}/>
            <Card className={"mx-4 mt-3 mb-3"}>
            {employees.map((employee) => (
                    <Row key={employee.id} className="p-2 m-1 align-items-center border-bottom border-3">
                        <Col xs={3} sm={3} md={2}>
                            <FontAwesomeIcon icon={faUser} size="2x" className="d-none"/>
                            <img src={employee.photo} alt={employee.name} className={"rounded-circle border border-2"}/>
                        </Col>
                        <Col xs={9} sm={6} md={7}>
                            <div className="fw-bold">Name: <a href="#" className={"no-underline"}>{employee.name}</a>
                            </div>
                            <div><span className="fw-bold">Position:</span> {employee.position}</div>
                            <div><span className="fw-bold">Working Since: </span> {employee.workingSince}</div>
                        </Col>
                        <Col xs={12} sm={3} md={3}>
                            <Button variant="primary" onClick={() => handleMakeRecruiter(employee.id)}>
                                <FontAwesomeIcon icon={faUserPlus}/>
                                <span className="ms-2">Make Recruiter</span>
                            </Button>
                        </Col>

                    </Row>

            ))}
            </Card>
        </Container>
    );
};

export default OrganizationEmployeePage