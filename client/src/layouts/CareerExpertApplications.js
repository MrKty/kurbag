import React, {useState} from 'react';
import {Row, Col, Image, Badge, Modal, Button, Container, Card, Form} from 'react-bootstrap';
import CareerExpertNavBar from "../components/CareerExpertNavBar";

function ApplicantSubtag({subtag}) {
    return (
        <Badge className="mb-2 me-2" bg="secondary">
            {subtag}
        </Badge>
    );
}

const uploadedFilesData = [
    {id: 1, name: "Cert_Compensation_Professional_(CCP).pdf"},
    {id: 2, name: "Cert_Compensation_Professional_(CCP).pdf"},
    {id: 3, name: "Cert_Professional_in_Talent_Development_(CPTD).pdf"},
];

const FileList = () => {
    return (
        <table className="table">
            <thead>
            <tr>
                <th>Certificates</th>
            </tr>
            </thead>
            <tbody>
            {uploadedFilesData.map((file) => (
                <tr key={file.id}>
                    <td>{file.name}</td>
                    <td>
                        <a href={`https://example.com/files/${file.id}`} download>
                            Download
                        </a>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

function ApplicationCard({application, handleClick}) {
    const {name, date, tag, subTags, photo} = application;
    const [show, setShow] = useState(false);
    const [selectedCertificates, setSelectedCertificates] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleCertificateSelect = (event) => {
        setSelectedCertificates([...selectedCertificates, event.target.files[0]]);
    };

    return (
        <>
            <Card className="my-2" onClick={handleShow} style={{cursor: 'pointer'}}>
                <Row>
                    <Col md={3}>
                        <Image src={photo} rounded fluid/>
                    </Col>
                    <Col md={2} className={'center-wrapper'}>
                        <div className="fw-bold">{name}</div>
                        <div className="text-muted">{date}</div>
                    </Col>
                    <Col md={5} className={'center-wrapper'}>
                        <Badge bg="primary" className="mb-2">
                            {tag}
                        </Badge>
                        {subTags.map((subtag) => (
                            <ApplicantSubtag key={subtag} subtag={subtag}/>
                        ))}
                    </Col>
                </Row>

            </Card>
            <Modal show={show} onHide={handleClose} className={"modal-xl"}>
                <Modal.Header closeButton>
                    <Modal.Title>Application Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col>
                            <Image src={photo} rounded fluid className="mb-1"/>
                        </Col>
                        <Col>
                            <div className="fw-bold">Applicant Name:</div>
                            <div className="fw-bold">Application Date:</div>
                        </Col>
                        <Col>
                            <a href={"#"} className={"no-underline"}>{name}</a>
                            <div className="">{date}</div>
                        </Col>
                    </Row>
                    <hr/>
                    <div><span className={"fw-bold"}>Applied Main Expertise Area:</span> {tag}</div>
                    <div className={"fw-bold"}>Applied Sub Expertise Areas:</div>
                    {subTags.map((subtag) => (
                        <ApplicantSubtag key={subtag} subtag={subtag}/>
                    ))}
                    <hr/>
                    <label htmlFor={"motivation"} className={"fw-bold"}>Motivation:</label>
                    <Row className="">
                        <div
                            id="motivation"
                            className="border border-dark rounded col-12 mx-auto p-1"
                            contentEditable="true"
                            style={{minHeight: '6em'}}>I am writing to express my interest in applying to write blogs in
                                                       the career expertise, internships, and remote work subareas. As a
                                                       passionate writer with a strong background in these areas, I
                                                       believe that I have the skills and experience necessary to create
                                                       informative, engaging, and insightful content for Kurbağ
                                                       audience.

                                                       Throughout my career, I have gained valuable experience in
                                                       various aspects of these areas, from my own personal experiences
                                                       to my research and work. With my unique perspective and
                                                       expertise, I am confident that I can create content that
                                                       resonates with your audience, offering practical tips, advice,
                                                       and insights that can help them achieve success in their careers.

                                                       As a writer, I am committed to delivering high-quality work that
                                                       meets your expectations and exceeds your readers' expectations. I
                                                       am well-versed in the latest trends, technologies, and best
                                                       practices in content creation, and I am confident that I can
                                                       deliver well-researched, relevant, and engaging articles that
                                                       capture the readers' attention.

                                                       Thank you for considering my application. I look forward to
                                                       contribute to this beautiful platform.

                                                       Sincerely,
                        </div>
                    </Row>
                    <Form.Group>
                        <Form.Label className={"visually-hidden"}>Certificates:</Form.Label>
                        <FileList/>
                    </Form.Group>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleClose} className={"fw-bold w-100"}>
                            Approve
                        </Button>
                    </Modal.Footer>
                </Modal.Body>
            </Modal>
        </>
    );
}

function CareerExpertApplications() {
    const [selectedApplication, setSelectedApplication] = useState(null);

    const applications = [
        {
            id: 1,
            name: "John Doe",
            date: "2022-02-14",
            tag: "Career",
            subTags: ["Remote Work", "Internships"],
            photo: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
            id: 2,
            name: "Jane Doe",
            date: "2022-02-12",
            tag: "Career",
            subTags: ["Freelancer", "Retirement"],
            photo: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        {
            id: 3,
            name: "Bob Smith",
            date: "2022-02-10",
            tag: "Career",
            subTags: ["Internships"],
            photo: "https://randomuser.me/api/portraits/men/3.jpg",
        },
        {
            id: 4,
            name: "Alice Johnson",
            date: "2022-02-09",
            tag: "Career",
            subTags: ["Remote Work", "Internships"],
            photo: "https://randomuser.me/api/portraits/women/4.jpg",
        },
        {
            id: 5,
            name: "Michael Brown",
            date: "2022-02-08",
            tag: "Career",
            subTags: ["Retirement", "Freelancer"],
            photo: "https://randomuser.me/api/portraits/men/5.jpg",
        },
    ];

    const handleApplicationClick = (application) => {
        setSelectedApplication(application);
    };

    const handleClosePopup = () => {
        setSelectedApplication(null);
    };

    return (
        <Container fluid>
            <CareerExpertNavBar underlined={'/career-expert/approve-applications'}/>
            <div className="center-wrapper">
                {applications.map((application) => (
                    <Col key={application.id} md={8}>
                        <ApplicationCard
                            application={application}
                            handleClick={handleApplicationClick}
                        />
                    </Col>
                ))}
            </div>

            {selectedApplication && (
                <div className="popup" onClick={handleClosePopup}>
                    <div className="popup-content">
                        <h2>{selectedApplication.applicantName}</h2>
                        <p>
                            Applied on: {selectedApplication.applicationDate} for{" "}
                            {selectedApplication.appliedTag}
                        </p>
                        <p>Sub-tags:</p>
                        <ul>
                            {selectedApplication.subTags.map((subTag) => (
                                <li key={subTag} className="sub-tag">
                                    {subTag}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </Container>
    );
}

export default CareerExpertApplications;
