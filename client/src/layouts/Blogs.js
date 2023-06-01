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
import InfiniteScroll from "react-infinite-scroll-component";


const Blogs = () => {
    const [showModal, setShowModal] = useState(false);
    const tags = ['Career', 'Job Search', 'Workplace', 'Technology', 'Engineering', 'Job Skills', 'Education', 'Marketing'];
    const [blogs, setBlogs] = useState([]);
    const [selectedTag, setSelectedTag] = useState("Career");
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);

    const handleTagClick = (tag) => {
        setLoading(true);
        setPage(0);
        setHasMore(true);
        setBlogs([]);
        setSelectedTag(tag);
    };

    const [mockData, setMockData] = useState([
        {tag: 'Career', isChecked: true},
        {tag: 'Job Search', isChecked: false},
        {tag: 'Workplace', isChecked: true},
        {tag: 'Technology', isChecked: false},
        {tag: 'Engineering', isChecked: true},
        {tag: 'Job Skills', isChecked: false},
        {tag: 'Education', isChecked: true},
        {tag: 'Marketing', isChecked: false},
    ]);

    const handleFollowTag = (tag) => {
        const updatedData = mockData.map((item) => {
            if (item.tag === tag) {
                return {...item, isChecked: !item.isChecked};
            }
            return item;
        });

        setMockData(updatedData);
    };

    const handleClose = () => {
        setShowModal(false);
    };

    const fetchData = () => {
        try {
            setLoading(true);

            const b_id = blogs.length > 0 ? blogs[blogs.length - 1].id : 0
            console.log(b_id)
            sendRequest('retrieve-blogs', 'POST', {b_id, selectedTag}, (data) => {
                setBlogs([...blogs, ...data.blogs]);
                // Update the page number
                setPage(prevPage => prevPage + blogs.length);

                // Check if there are more items to load
                setHasMore(data.blogs.length > 0);
                console.log(data.blogs)
                setLoading(false);
            });

        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData()
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
                                <h2 className="mt-2" style={{fontSize: '2.5rem'}}>
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
                                        {mockData.map(({tag, isChecked}) => (
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
                        <InfiniteScroll
                            dataLength={blogs.length}
                            next={fetchData}
                            hasMore={hasMore}
                            loader={<p>Loading...</p>}
                            endMessage={<p>No more data to load.</p>}
                            className={"overflow-hidden"}
                        >
                            <Row className="justify-content-center">
                                {blogs.map((blog, index) => (
                                    <Col key={index} className="col-5 mb-3 mx-auto my-auto">
                                        <Link style={{textDecoration: 'none', color: 'black'}}
                                              to={`/blog-viewer/${blog.id}`}>
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
                        </InfiniteScroll>
                        {error && <p>Error: {error.message}</p>}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Blogs;