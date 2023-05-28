import React, {useState, useEffect} from "react";
import {Container, Row, Col, Button, Card, Badge, Image, Modal, Form} from 'react-bootstrap';
import NavBar from "../components/NavBar";
import CareerExpertModal from "../components/modals/CareerExpertModal";
import CareerExpertNavBar from "../components/CareerExpertNavBar";
import {faHeart, faComment} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'
import sendRequest from "../utils/request";
import BlogCard from "../components/BlogCard"
import {Link} from "react-router-dom";


const Blogs = () => {
    const [showModal, setShowModal] = useState(false);
    const tags = ['Career', 'Job Search', 'Workplace', 'Technology', 'Engineering', 'Job Skills', 'Education', 'Marketing'];
    const [blogs, setBlogs] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);

    const handleTagClick = (tag) => {
        setSelectedTag(tag);
    };

    const sampleBlogs = [
        {
            id: 1,
            coverPhoto: "https://www.zdnet.com/a/img/resize/b875a130a720d51fc03b9ab0f2cb84fa104a0080/2020/12/18/96b7b3e9-d4a9-4b6e-ac5b-36f21ab777ff/remote-work-2021-header.jpg?auto=webp&width=1280",
            title: "Remote Work: Pros and Cons",
            summary: "Remote work is a growing trend in the modern workplace. This blog explores the benefits and drawbacks of remote work, and offers tips for staying productive and connected when working from home.",
            name: "Sarah Smith",
            likeNumber: 25,
            commentNumber: 10,
        },
        {
            id: 2,
            coverPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ7yHyUsKGbYlicodSZ3THUG3h0sZRGk76IQ&usqp=CAU",
            title: "The Benefits of Internships",
            summary: "Internships are a valuable experience for students and recent graduates looking to gain practical skills and knowledge. This blog discusses the benefits of internships, and offers tips for making the most of your internship experience.",
            name: "John Doe",
            likeNumber: 15,
            commentNumber: 5,
        },
        {
            id: 3,
            coverPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4lzBSkaFUhiXlIzFFfLmtzhWF2ueFMrv4Jg&usqp=CAU",
            title: "Retirement Planning: What You Need to Know",
            summary: "Retirement planning is an important part of financial planning. This blog provides an overview of retirement planning, including the different types of retirement accounts, how to calculate your retirement needs, and tips for saving for retirement.",
            name: "Jane Smith",
            likeNumber: 20,
            commentNumber: 7,
        }
    ]

    const [mockData, setMockData] = useState([
        { tag: 'Career', isChecked: true },
        { tag: 'Job Search', isChecked: false },
        { tag: 'Workplace', isChecked: true },
        { tag: 'Technology', isChecked: false },
        { tag: 'Engineering', isChecked: true },
        { tag: 'Job Skills', isChecked: false },
        { tag: 'Education', isChecked: true },
        { tag: 'Marketing', isChecked: false },
    ]);

    const handleFollowTag = (tag) => {
        const updatedData = mockData.map((item) => {
            if (item.tag === tag) {
                return { ...item, isChecked: !item.isChecked };
            }
            return item;
        });

        setMockData(updatedData);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    useEffect(() => {

        const sendData = {
            selectedTag
        }

        sendRequest('blogs', 'POST', sendData, (data) => {
            // Here comes blog data from backend
            setBlogs(data);
        });
    }, [selectedTag]);

    const [showFollowTagModal, setShowFollowTagModal] = useState(false);

    const handleFollowTagModal = () => {
        // Add your logic to handle the "Follow Tag" button click here
        setShowFollowTagModal(true);
    };
    const handleFollowTagClose = () => {
        setShowFollowTagModal(false);
    };


    return (
        <Container fluid>
            <NavBar activeLink="blogs"/>
            <Row className="justify-content-center">
                <Col xs={10} md={10} lg={10}>
                    <div>
                        <Row className="align-items-center">
                            <Col xs="auto">
                                <h2 className="mt-2" style={{ fontSize: '2.5rem' }}>
                                    From Your Followings
                                </h2>
                            </Col>
                            <Col xs="auto">
                                <Button variant="primary" onClick={handleFollowTagModal}>
                                    Follow Tag
                                </Button>
                            </Col>
                            <Modal show={showFollowTagModal} onHide={handleFollowTagClose}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Follow Tags</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Form>
                                        {mockData.map(({ tag, isChecked }) => (
                                            <Form.Check
                                                key={tag}
                                                type="checkbox"
                                                id={tag}
                                                label={tag}
                                                defaultChecked={isChecked}
                                                onChange={() => handleFollowTag(tag)}
                                            />
                                        ))}
                                    </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleFollowTagClose}>
                                        Close
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </Row>

                        <div className={"mb-2"} style={{display: "flex", flexWrap: "wrap"}}>
                            {tags.map((tag) => (
                                <Badge
                                    key={tag}
                                    pill
                                    style={{
                                        margin: '0.5rem',
                                        cursor: 'pointer',
                                    }}
                                    bg={tag === selectedTag ? "secondary" : "primary"}
                                    onClick={() => handleTagClick(tag)}
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                        <Row>
                            {blogs.map((blog) => (
                                <Col key={blog.id}>
                                    <BlogCard
                                        coverPhoto={blog.coverPhoto}
                                        title={blog.title}
                                        summary={blog.summary}
                                        name={blog.name}
                                        likeNumber={blog.likeNumber}
                                        commentNumber={blog.commentNumber}
                                    />
                                </Col>
                            ))}
                            {sampleBlogs.map((blog) => (
                                <Col key={blog.id}>
                                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/blog-viewer/${blog.id}`}>
                                        <BlogCard
                                            coverPhoto={blog.coverPhoto}
                                            title={blog.title}
                                            summary={blog.summary}
                                            name={blog.name}
                                            likeNumber={blog.likeNumber}
                                            commentNumber={blog.commentNumber}
                                        />
                                    </Link>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </Col>
            </Row>
            <Row className="text-center m-3">
                <span className={"mb-2 fw-bold"}>Swipe down for more</span>
                <FontAwesomeIcon icon={faArrowDown}/>
            </Row>
        </Container>
    );
};

export default Blogs;