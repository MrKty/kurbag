//TODO PREVIOUS BLOGS FOR CAREER EXPERT

import CareerExpertNavBar from "../components/CareerExpertNavBar";
import React, {useEffect, useState} from "react";
import {Col, Container, Dropdown, Row} from "react-bootstrap";
import BlogCard from "../components/BlogCard"
import PostCard from "../components/PostCard";
import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import sendRequest from "../utils/request";
import InfiniteScroll from "react-infinite-scroll-component";

const PreviousBlogs = () => {
    const [showModal, setShowModal] = useState(false);
    const [blogs, setBlogs] = useState([]);
    const [filtering, setFiltering] = useState(0);
    const [sorting, setSorting] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);

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

    const fetchData = () => {
        try {
            setLoading(true);

            const b_id = blogs.length > 0 ? blogs[blogs.length - 1].id : 0
            console.log(b_id)
            sendRequest('retrieve-c-e-previous-blogs', 'POST', {b_id}, (data) => {
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
    }, []);

    return (
        <Container fluid>
            <CareerExpertNavBar activeLink="previous-blogs"/>
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
                            <DropdownItem onClick={() => handleFilterSelection('Most Commented')}
                                          active={filtering === 3}>
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
                            <DropdownItem onClick={() => handleSortingSelection('Most Commented')}
                                          active={sorting === 3}>
                                Institution Post
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </Col>
            </Row>


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
            </InfiniteScroll>
            {error && <p>Error: {error.message}</p>}
        </Container>
    );
};
export default PreviousBlogs