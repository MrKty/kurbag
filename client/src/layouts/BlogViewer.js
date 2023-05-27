import {Card, Button, Row, Col, Badge, Navbar, Container} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faThumbsUp, faComment} from '@fortawesome/free-solid-svg-icons';
import {Link, useParams} from "react-router-dom";
import NavBar from "../components/NavBar";
import React from "react";


const blog = {
    author: 'Jane Smith',
    title: 'Retirement Planning: What You Need to Know',
    summary: "Retirement planning is an important part of financial planning. This blog provides an overview of retirement planning, including the different types of retirement accounts, how to calculate your retirement needs, and tips for saving for retirement.",
    content: "Retirement planning is a crucial aspect of financial planning. Unfortunately, many people fail to adequately plan for their retirement, which can result in financial hardship during their golden years. Retirement planning involves taking steps to ensure you have enough money to support your lifestyle when you stop working. This blog post provides an overview of retirement planning, including the different types of retirement accounts, how to calculate your retirement needs, and tips for saving for retirement.\n" +
        "Types of Retirement Accounts\n" +
        "One of the first steps in retirement planning is to understand the different types of retirement accounts available to you. These include:\n" +
        "401(k) plans – These are retirement plans offered by employers. You can contribute a portion of your salary to the plan, and your employer may also make contributions. The contributions are tax-deferred, which means you don't pay taxes on the money until you withdraw it.\n" +
        "Individual Retirement Accounts (IRAs) – IRAs are retirement accounts that you can set up on your own. You can contribute up to a certain amount each year, and the contributions may be tax-deductible. Like 401(k) plans, the money in the account grows tax-free until you withdraw it.\n" +
        "Roth IRAs – These are similar to traditional IRAs, but the contributions are not tax-deductible. However, the money grows tax-free and withdrawals in retirement are tax-free as well.\n" +
        "Calculating Your Retirement Needs\n" +
        "Once you understand the different types of retirement accounts available to you, the next step is to calculate your retirement needs. This involves estimating how much money you will need to support your lifestyle in retirement. Factors to consider include your current expenses, how much you plan to spend on healthcare, and how long you expect to live.\n" +
        "To calculate your retirement needs, start by estimating your annual expenses in retirement. You can then multiply this by the number of years you expect to be retired. Don't forget to factor in inflation, which can significantly impact your expenses over time. It's also a good idea to estimate your healthcare costs, as these can be a significant expense in retirement.\n" +
        "Saving for Retirement\n" +
        "Once you have calculated your retirement needs, the next step is to start saving for retirement. Here are some tips to help you get started:\n" +
        "Start early – The earlier you start saving for retirement, the more time your money has to grow. Even small contributions can add up over time.\n" +
        "In conclusion, retirement planning is a crucial part of financial planning. Understanding the different types of retirement accounts available to you, calculating your retirement needs, and saving for retirement are all important steps in ensuring you have enough money to support your lifestyle when you stop working. By taking these steps, you can enjoy your golden years with financial peace of mind.",
    coverPhoto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4lzBSkaFUhiXlIzFFfLmtzhWF2ueFMrv4Jg&usqp=CAU',
    date: '2023-04-19',
    tags: ['Career', 'Retirement']
};

function BlogCard(props) {

    const { id } = useParams(); // Access the blog ID from the URL
    const {coverPhoto, title, summary, content, date, tags, author, likeCount, commentCount} = props.blog;

    const paragraphs = content.split('\n').map((para, index) => {
        return <p key={index}>{para}<br/></p>;
    });


    return (
        <Card className="mx-auto my-4 col-9">
            <Card.Title>THE ID OF THE BLOG: {id}</Card.Title>
            <Card.Img variant="top" src={coverPhoto}/>
            <Card.Body>
                <div>
                    <hr/>
                    <Row className="align-items-center">
                        <Col xs={1}>
                            <img
                                src={coverPhoto}
                                alt="Profile"
                                className="rounded-circle"
                                width="50"
                                height="50"
                            />
                        </Col>
                        <Col xs={5}>
                            <Link to={"#"} className={"text-start no-underline fw-bold"}>{author}</Link>
                        </Col>
                        <Col xs={6} className={"text-end"}>
                            <button className="btn btn-primary">Follow</button>
                        </Col>
                    </Row>
                    <hr/>
                    <div>
                        <h2>Related Tags</h2>
                        {tags.map((tag, index) => (
                            <Badge key={tag} className="m-2" bg={index === 1 ? "primary" : "secondary"}>
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>
                <Row>
                    <Col className={"col-9"}><Card.Title><h2 className={"fw-bold"}>{title}</h2></Card.Title>
                    </Col>
                    <Col className={"col-3  d-flex align-items-center"}>
                        <h6 className={"text-end"}><h5>Creation Date: {date}</h5></h6>
                    </Col>
                </Row>
                <Card.Text>{summary}</Card.Text>
                <Card.Text>{paragraphs}</Card.Text>
                <div className="d-flex justify-content-between align-items-center mt-3">
                    <div>
                        <Button className="me-3" variant="primary">
                            <FontAwesomeIcon icon={faThumbsUp} className="me-2"/>
                            Like
                        </Button>
                        <Button variant="secondary">
                            <FontAwesomeIcon icon={faComment} className="me-2"/>
                            Comment
                        </Button>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}

function BlogViewer() {
    return (
        <Container fluid>
            <NavBar handleClick={null}/>
            <div>
                <BlogCard blog={blog}/>
            </div>
        </Container>
    );
}

export default BlogViewer;



