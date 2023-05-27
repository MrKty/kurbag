import {Card, Col, Image, Row} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faComment, faHeart} from "@fortawesome/free-solid-svg-icons";
import React from "react";

const BlogCard = ({id, coverPhoto, title, summary, name, likeNumber, commentNumber}) => {
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

export default BlogCard