//TODO PREVIOUS BLOGS FOR CAREER EXPERT

import CareerExpertNavBar from "../components/CareerExpertNavBar";
import React, {useState} from "react";
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import BlogCard from "../components/BlogCard"
import PostCard from "../components/PostCard";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";


const mockBlogCards = [
    {
        coverPhoto: "https://www.zdnet.com/a/img/resize/b875a130a720d51fc03b9ab0f2cb84fa104a0080/2020/12/18/96b7b3e9-d4a9-4b6e-ac5b-36f21ab777ff/remote-work-2021-header.jpg?auto=webp&width=1280",
        title: "Remote Work: Pros and Cons",
        summary: "Remote work is a growing trend in the modern workplace. This blog explores the benefits and drawbacks of remote work, and offers tips for staying productive and connected when working from home.",
        name: "Sarah Smith",
        likeNumber: 25,
        commentNumber: 10,
        subtag: "Remote Work"
    },
    {
        coverPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ7yHyUsKGbYlicodSZ3THUG3h0sZRGk76IQ&usqp=CAU",
        title: "The Future of Artificial Intelligence",
        summary: "Discover the latest advancements and potential future developments in the field of artificial intelligence. Explore the impact of AI on various industries and its ethical considerations.",
        name: "John Doe",
        likeNumber: 15,
        commentNumber: 5,
        subtag: "Artificial Intelligence"
    },
    {
        coverPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4lzBSkaFUhiXlIzFFfLmtzhWF2ueFMrv4Jg&usqp=CAU",
        title: "Effective Time Management Techniques",
        summary: "Learn practical time management techniques to boost productivity and achieve better work-life balance. This blog provides valuable tips and strategies for managing your time effectively.",
        name: "Emily Johnson",
        likeNumber: 12,
        commentNumber: 8,
        subtag: "Productivity"
    },
    {
        coverPhoto: "https://www.zdnet.com/a/img/resize/b875a130a720d51fc03b9ab0f2cb84fa104a0080/2020/12/18/96b7b3e9-d4a9-4b6e-ac5b-36f21ab777ff/remote-work-2021-header.jpg?auto=webp&width=1280",
        title: "Remote Work: Pros and Cons",
        summary: "Remote work is a growing trend in the modern workplace. This blog explores the benefits and drawbacks of remote work, and offers tips for staying productive and connected when working from home.",
        name: "Sarah Smith",
        likeNumber: 25,
        commentNumber: 10,
        subtag: "Remote Work"
    },
    {
        coverPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ7yHyUsKGbYlicodSZ3THUG3h0sZRGk76IQ&usqp=CAU",
        title: "The Future of Artificial Intelligence",
        summary: "Discover the latest advancements and potential future developments in the field of artificial intelligence. Explore the impact of AI on various industries and its ethical considerations.",
        name: "John Doe",
        likeNumber: 15,
        commentNumber: 5,
        subtag: "Artificial Intelligence"
    },
    {
        coverPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4lzBSkaFUhiXlIzFFfLmtzhWF2ueFMrv4Jg&usqp=CAU",
        title: "Effective Time Management Techniques",
        summary: "Learn practical time management techniques to boost productivity and achieve better work-life balance. This blog provides valuable tips and strategies for managing your time effectively.",
        name: "Emily Johnson",
        likeNumber: 12,
        commentNumber: 8,
        subtag: "Productivity"
    },
    {
        coverPhoto: "https://www.zdnet.com/a/img/resize/b875a130a720d51fc03b9ab0f2cb84fa104a0080/2020/12/18/96b7b3e9-d4a9-4b6e-ac5b-36f21ab777ff/remote-work-2021-header.jpg?auto=webp&width=1280",
        title: "Remote Work: Pros and Cons",
        summary: "Remote work is a growing trend in the modern workplace. This blog explores the benefits and drawbacks of remote work, and offers tips for staying productive and connected when working from home.",
        name: "Sarah Smith",
        likeNumber: 25,
        commentNumber: 10,
        subtag: "Remote Work"
    },
    {
        coverPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ7yHyUsKGbYlicodSZ3THUG3h0sZRGk76IQ&usqp=CAU",
        title: "The Future of Artificial Intelligence",
        summary: "Discover the latest advancements and potential future developments in the field of artificial intelligence. Explore the impact of AI on various industries and its ethical considerations.",
        name: "John Doe",
        likeNumber: 15,
        commentNumber: 5,
        subtag: "Artificial Intelligence"
    },
    {
        coverPhoto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4lzBSkaFUhiXlIzFFfLmtzhWF2ueFMrv4Jg&usqp=CAU",
        title: "Effective Time Management Techniques",
        summary: "Learn practical time management techniques to boost productivity and achieve better work-life balance. This blog provides valuable tips and strategies for managing your time effectively.",
        name: "Emily Johnson",
        likeNumber: 12,
        commentNumber: 8,
        subtag: "Productivity"
    },
    // Add more mock blog card data here...
];

const PreviousBlogs = () => {


    const [showModal, setShowModal] = useState(false);
    const [userType, setUserType] = useState(0);

    const [filtering, setFiltering] = useState(0);
    const [sorting, setSorting] = useState(0);

    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);



    const toggleFilterDropdown = () => {
        setFilterDropdownOpen(!filterDropdownOpen);
    };

    const toggleSortDropdown = () => {
        setSortDropdownOpen(!sortDropdownOpen);
    };

    const handleFilterSelection = (option) => {
        let filterValue = 0;
        if (option === 'Recent') {
            filterValue = 1;
        } else if (option === 'Most Liked') {
            filterValue = 2;
        } else if (option === 'Most Commented') {
            filterValue = 3;
        }
        setFiltering(filterValue);
    };

    const handleSortingSelection = (option) => {
        let sortingValue = 0;
        if (option === 'Recent') {
            sortingValue = 1;
        } else if (option === 'Most Liked') {
            sortingValue = 2;
        } else if (option === 'Most Commented') {
            sortingValue = 3;
        }
        setSorting(sortingValue);
    };

    return (
        <Container fluid>
            <CareerExpertNavBar activeLink="previous-blogs" />
            <Row>
                <Col className="justify-content-center col-12 text-center">
                    <h1 className="fw-bold">Your Previous Blogs</h1>
                </Col>
            </Row>
            <Row className="mb-5 mt-2 align-items-center justify-content-center">
                <Col className="col-2 text-center">
                    <Dropdown className="me-2" show={filterDropdownOpen} onToggle={toggleFilterDropdown}>
                        <DropdownToggle variant="primary" id="dropdown-sorting">
                            Sorting Options
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => handleFilterSelection('Recent')} active={filtering === 1}>
                                Recent
                            </DropdownItem>
                            <DropdownItem onClick={() => handleFilterSelection('Most Liked')} active={filtering === 2}>
                                Most Liked
                            </DropdownItem>
                            <DropdownItem onClick={() => handleFilterSelection('Most Commented')} active={filtering === 3}>
                                Most Commented
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Col>
                <Col className="col-2 text-center">
                    <Dropdown show={sortDropdownOpen} onToggle={toggleSortDropdown}>
                        <DropdownToggle variant="primary" id="dropdown-filtering">
                            Filter Options
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={() => handleSortingSelection('Recent')} active={sorting === 1}>
                                Normal User Posts
                            </DropdownItem>
                            <DropdownItem onClick={() => handleSortingSelection('Most Liked')} active={sorting === 2}>
                                Company Posts
                            </DropdownItem>
                            <DropdownItem onClick={() => handleSortingSelection('Most Commented')} active={sorting === 3}>
                                Institution Post
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Row>


            <Row className="justify-content-center">
                    {mockBlogCards.map((blog, index) => (
                        <Col key={index} className="col-5 mb-3 mx-auto my-auto">
                            <BlogCard
                                coverPhoto={blog.coverPhoto}
                                title={blog.title}
                                summary={blog.summary}
                                name={blog.name}
                                commentNumber={blog.commentNumber}
                                likeNumber={blog.likeNumber}
                            />
                        </Col>
                ))}
            </Row>
        </Container>
    );
};
export default PreviousBlogs