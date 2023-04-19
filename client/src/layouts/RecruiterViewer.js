import {Card, Button, Row, Col, Badge, Navbar, Container} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faComment} from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import NavBar from "../components/NavBar";
import React from "react";
import RecruiterNavBar from "../components/RecruiterNavBar";

function RecruiterViewer() {
    return (
        <Container fluid>
            <RecruiterNavBar handleClick={null}/>

        </Container>

    );
}

export default RecruiterViewer;