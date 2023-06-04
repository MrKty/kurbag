import React, {useState, useEffect} from "react";
import {
    Container,
    Row,
    Col,
    Button,
    Card,
    Badge,
    Image,
    ToggleButton,
    Form,
    DropdownButton,
    Dropdown,
    Modal
} from 'react-bootstrap';
import NavBar from "../components/NavBar";
import PostCard from "../components/PostCard";

import DropdownToggle from "react-bootstrap/DropdownToggle";
import DropdownMenu from "react-bootstrap/DropdownMenu";
import DropdownItem from "react-bootstrap/DropdownItem";
import EventCard from "../components/EventCard";


import sendRequest from "../utils/request";
import "firebase/compat/storage";
import CreateEventModal from "../components/modals/CreateEventModal";
import CreatePostModal from "../components/modals/CreatePostModal";
import InfiniteScroll from "react-infinite-scroll-component";


const HomePage = () => {
    const [showCreatePostModal, setShowCreatePostModal] = useState(false);
    const [showCreateEventModal, setShowCreateEventModal] = useState(false);
    const [filtering, setFiltering] = useState(1);
    const [sorting, setSorting] = useState(1);

    const [filterDropdownOpen, setFilterDropdownOpen] = useState(false);
    const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

    const toggleFilterDropdown = () => {
        setFilterDropdownOpen(!filterDropdownOpen);
    };

    const toggleSortDropdown = () => {
        setSortDropdownOpen(!sortDropdownOpen);
    };

    const toggleCreatePostModal = () => {
        setShowCreatePostModal(!showCreatePostModal);
        fetchData()
    };

    const toggleCreateEventModal = () => {
        setShowCreateEventModal(!showCreateEventModal);
    };


    const handleFilterSelection = (option) => {
        let filterValue = 1;
        if (option === 'Both') {
            filterValue = 1;
        } else if (option === 'Only Posts') {
            filterValue = 2;
        } else if (option === 'Only Events') {
            filterValue = 3;
        }
        setFiltering(filterValue);
    };

    const handleSortingSelection = (option) => {
        let sortingValue = 1;
        if (option === 'FiFo') {
            sortingValue = 1;
        } else if (option === 'Recent') {
            sortingValue = 2;
        }
        setSorting(sortingValue);
    };

    const [posts, setPosts] = useState([]);
    const [events, setEvents] = useState([]);
    const [feeds, setFeeds] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(0);

    const fetchData = () => {
        try {
            setLoading(true);

            const p_id = posts.length > 0 ? posts[posts.length - 1].id : 0
            const e_id = events.length > 0 ? events[events.length - 1].id : 0

            // Make an API request to fetch more data
            sendRequest('home-get-post', 'POST', {page, p_id, e_id, sorting, filtering}, (data) => {
                // Update the state with the new data
                setPosts([...posts, ...data.posts]);
                setEvents([...events, ...data.events]);

                if (data.posts && data.events) {
                    console.log("Here")
                    const combinedList = data.posts.concat(data.events);
                    console.log(combinedList)
                    setFeeds([...feeds, ...combinedList])
                } else if (data.posts) {
                    setFeeds([...feeds, ...data.posts]);
                } else if (data.events) {
                    setFeeds([...feeds, ...data.events]);
                }

                console.log("feeds")
                console.log(feeds)

                // Update the page number
                setPage(prevPage => prevPage + 4);

                // Check if there are more items to load
                console.log(data.posts.length)
                console.log(data.events.length)
                setHasMore(data.posts.length > 0 || data.events.length > 0);

                setLoading(false);
            });


        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Container fluid>
            <NavBar activeLink="home"/>
            <Col className="d-flex bd-highlight mt-3 mb-2 align-items-end">
                <Col className="d-flex col-9">
                </Col>
                <Col className="d-flex col-3 justify-content-evenly">
                    <Row>
                        <Button variant="primary" className="justify-content-center me-2"
                                onClick={toggleCreatePostModal}>
                            Create Post
                        </Button>
                    </Row>
                    <Row>
                        <Button variant="primary" className="justify-content-center me-2"
                                onClick={toggleCreateEventModal}>
                            Create Event
                        </Button>
                    </Row>
                </Col>
                <CreatePostModal showModal={showCreatePostModal} toggleCreatePostModal={toggleCreatePostModal}/>
                <CreateEventModal showModal={showCreateEventModal} toggleCreateEventModal={toggleCreateEventModal}/>
            </Col>
            <Row>
                <Col className="d-inline-block justify-content-center">
                    <InfiniteScroll
                        dataLength={posts.length}
                        next={fetchData}
                        hasMore={hasMore}
                        loader={<p>Loading...</p>}
                        endMessage={<p>No more data to load.</p>}
                    >
                        <ul>
                            {feeds.map(feed => (
                                <Row className="justify-content-center">
                                    {feed.websiteLink && <EventCard
                                        key={feed.id}
                                        event={feed}
                                        onRegisterEvent={null}
                                    />}
                                    {feed.likeNumber >= 0 &&
                                        <PostCard content={feed.content} name={feed.name} title={feed.title}
                                                  likeNumber={feed.likeNumber} commentNumber={feed.commentNumber}
                                                  timestamp={feed.timestamp} postId={feed.id}/>}
                                </Row>
                            ))}
                        </ul>
                    </InfiniteScroll>
                    {error && <p>Error: {error.message}</p>}
                </Col>
            </Row>
        </Container>
    )
};

export default HomePage