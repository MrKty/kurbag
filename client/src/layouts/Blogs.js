import React, {useState, useEffect} from "react";
import {Container, Row, Col, Button, Card, Badge, Image} from 'react-bootstrap';
import NavBar from "../components/NavBar";
import CareerExpertModal from "../components/modals/CareerExpertModal";
import CareerExpertNavBar from "../components/CareerExpertNavBar";
import {faHeart, faComment} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'
import sendRequest from "../utils/request";

const BlogCard = ({coverPhoto, title, summary, name, likeNumber, commentNumber}) => {
    const firstSentence = summary.substring(0, 100);
    const truncatedSummary = `${firstSentence}`;

    return (
        <Card className={"col-12"} style={{minHeight: "500px"}}>
            <Image src={coverPhoto} alt="Cover" fluid style={{height: "200px"}}/>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{truncatedSummary} <span className={"text-muted"}>... see more</span></Card.Text>
                <a href="#" className="card-name no-underline">{name}</a>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col className="d-flex card-likes justify-content-center align-content-center">
                        <FontAwesomeIcon className={"align-self-center me-2"} icon={faHeart}/> {likeNumber}
                    </Col>
                    <Col className="d-flex card-comments justify-content-center">
                        <FontAwesomeIcon className={"align-self-center me-2"} icon={faComment}/> {commentNumber}
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    );
};

const Blogs = () => {
    const [showModal, setShowModal] = useState(false);
    const [userType, setUserType] = useState(0);
    const [shouldRenderNavBar, setShouldRenderNavBar] = useState(false);
    const tags = ['Career', 'Job Search', 'Workplace', 'Technology', 'Engineering', 'Job Skills', 'Education', 'Marketing'];
    const subTags = ['Remote Work', 'Internships', 'Retirement', 'Freelancer', 'Networking']
    const [blogs, setBlogs] = useState([]);
    const [selectedTag, setSelectedTag] = useState(null);

    const handleTagClick = (tag) => {
        setSelectedTag(tag);
    };


    const handleClick = (type) => {
        if (userType === type) {
            // Rerender the page
            // Add your code to rerender the page here
            console.log('Rerendering page');
            setUserType(0);
        } else {
            // Open the popup
            setShowModal(true);
            setUserType(type);
        }
    };

    const handleClose = () => {
        setShowModal(false);
    };

    useEffect(() => {
        if (userType === 1) {
            setShouldRenderNavBar(true);
        } else {
            setShouldRenderNavBar(false);
        }
        // TODO Tag listesini getir
    }, [userType]);

    useEffect(() => {

        const sendData = {
            selectedTag
        }

        sendRequest('blogs', 'POST', sendData, (data) => {
            // Here comes blog data from backend
            setBlogs(data);
        });
    }, [selectedTag]);

    return (
        <Container fluid>
            {userType === 1 ? <CareerExpertNavBar handleClick={handleClick} activeLink="blogs"/> :
                <NavBar handleClick={handleClick} activeLink="blogs"/>}
            <Row className="justify-content-center">
                <Col xs={10} md={10} lg={10}>
                    <div>
                        <h2 className={"mt-2"} style={{fontSize: '2.5rem'}}>From Your Followings</h2>
                        <div className={"mb-2 d-flex flex-wrap"}>
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
                        <h3 className={"mt-2"} style={{fontSize: '1.5rem'}}>Career</h3>
                        <div className={"mb-2"} style={{display: "flex", flexWrap: "wrap"}}>
                            {subTags.map((tag) => (
                                <Badge
                                    key={tag}
                                    pill
                                    style={{
                                        margin: '0.5rem',
                                        cursor: 'pointer',
                                    }}
                                    bg={"primary"}
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
                                        subtag={blog.subtag}
                                    />
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
            <CareerExpertModal showModal={showModal} handleClose={handleClose}/>
        </Container>
    );
};

export default Blogs;