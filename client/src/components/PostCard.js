import React, {useState, useEffect} from "react";
import {Container, Row, Col, Button, Card, Badge, Image} from 'react-bootstrap';
import NavBar from "../components/NavBar";
import CareerExpertModal from "../components/modals/CareerExpertModal";
import CareerExpertNavBar from "../components/CareerExpertNavBar";
import {faHeart, faComment} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'
import sendRequest from "../utils/request";

const PostCard = ({ title, content, timestamp, name, likeNumber, commentNumber, postId }) => {

    const handleLikeClick = () => {
        const requestData = {
            userId: localStorage.getItem("userId"),
            postId: postId
        }

        sendRequest('like-post', 'POST', requestData, (data) => {
            // Update the state with the new data
        });
    };

    return (
        <Card className={"col-6 mt-2 mb-2"} style={{ minHeight: "100px", maxHeight: "400px", overflowY: "auto" }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>{content} <span className={"text-muted"}></span></Card.Text>
                <a href="#" className="card-name no-underline">{name}</a>
            </Card.Body>
            <Card.Footer>
                <Row>
                    <Col className="d-flex card-likes justify-content-center align-content-center">
                        <FontAwesomeIcon className={"align-self-center me-2"} icon={faHeart} onClick={handleLikeClick} /> {likeNumber}
                    </Col>
                    <Col className="d-flex card-comments justify-content-center">
                        <FontAwesomeIcon className={"align-self-center me-2"} icon={faComment} /> {commentNumber}
                    </Col>
                </Row>
            </Card.Footer>
        </Card>
    );
};

export default PostCard;