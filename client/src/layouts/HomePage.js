import React, {useState, useEffect} from "react";
import {Container, Row, Col, Button, Card, Badge, Image} from 'react-bootstrap';
import NavBar from "../components/NavBar";
import PostCard from "../components/PostCard";
import CareerExpertModal from "../components/modals/CareerExpertModal";
import CareerExpertNavBar from "../components/CareerExpertNavBar";
import {faHeart, faComment} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faArrowDown} from '@fortawesome/free-solid-svg-icons'



const HomePage = () => {

    const samplePosts = [
        {
            title: 'Post 1',
            content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            timestamp: 'May 21, 2023',
            name: 'John Doe',
            likeNumber: 10,
            commentNumber: 5,
        },
        {
            title: 'Post 2',
            content: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
            timestamp: 'May 22, 2023',
            name: 'Jane Smith',
            likeNumber: 15,
            commentNumber: 3,
        },
        {
            title: 'Post 3',
            content:
                'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed gravida pharetra convallis. Proin vitae semper dui. Nullam pharetra leo eu nisi commodo, at aliquam urna aliquet. Cras efficitur, erat ac tincidunt sagittis, tortor ex iaculis elit, at malesuada nisl sapien id erat. Curabitur placerat est tellus, eu placerat diam molestie ac. Nullam viverra, enim a facilisis venenatis, tellus metus consequat felis, et dictum nunc massa non tellus. Mauris tristique ipsum sed luctus placerat. Mauris elementum nisi at nisl volutpat placerat. Quisque fringilla finibus est, in hendrerit augue tempor sed. Integer tincidunt ex et velit rhoncus, sit amet aliquam est semper.',
            timestamp: 'May 23, 2023',
            name: 'Mark Johnson',
            likeNumber: 20,
            commentNumber: 8,
        },
        {
            title: 'Post 4',
            content:
                'Vestibulum consequat elit sit amet dapibus tincidunt. Suspendisse faucibus condimentum felis non facilisis. In consectetur venenatis ultrices. Donec in ex justo. Duis ac ligula vel nisi tincidunt finibus ac ut quam. Nullam nec arcu a massa iaculis lobortis. Sed venenatis fermentum neque, a suscipit ante condimentum at. Nulla facilisi.',
            timestamp: 'May 24, 2023',
            name: 'Emily Davis',
            likeNumber: 12,
            commentNumber: 6,
        },
        {
            title: 'Post 5',
            content:
                'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce vel sapien at magna eleifend rhoncus vitae ac enim. Nullam accumsan, sem ac varius iaculis, justo felis convallis lacus, a ultrices dolor neque sit amet est. Donec rutrum rhoncus rutrum. Fusce aliquet enim et lectus rhoncus, eu ultrices nunc varius. Aenean pulvinar tristique bibendum. Aenean sagittis urna vitae mauris finibus, id posuere odio molestie.',
            timestamp: 'May 25, 2023',
            name: 'Michael Wilson',
            likeNumber: 18,
            commentNumber: 7,
        },
        {
            title: 'Post 6',
            content:
                'Curabitur consectetur est et diam eleifend, vel facilisis ligula aliquet. Maecenas tristique est ut ligula hendrerit, sed condimentum mi fringilla. Phasellus pulvinar ex ut tincidunt euismod. In congue tristique diam, sed vulputate nisl venenatis vel. Cras vitae facilisis enim. Mauris in velit nunc. Vestibulum luctus tortor at dui consequat interdum.',
            timestamp: 'May 26, 2023',
            name: 'Sophia Anderson',
            likeNumber: 25,
            commentNumber: 4,
        },
        {
            title: 'Post 7',
            content:
                'Maecenas tincidunt justo eu dolor consectetur, ut commodo sapien volutpat. Suspendisse non felis ac risus gravida semper. Sed faucibus ipsum sed erat semper auctor. Nullam fringilla turpis sit amet erat posuere tincidunt. Suspendisse potenti. Nullam blandit vestibulum nulla ac posuere. Cras id ex ut enim dignissim aliquet ut id sem. Curabitur a arcu odio.',
            timestamp: 'May 27, 2023',
            name: 'Oliver Taylor',
            likeNumber: 14,
            commentNumber: 3,
        },
        {
            title: 'Post 8',
            content:
                'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Maecenas blandit ex id scelerisque euismod. Proin non diam fringilla, vulputate elit a, euismod leo. Aenean a nibh ac neque finibus tempus et eu nibh. Sed blandit, arcu vel aliquam tempor, nisl sapien finibus magna, nec interdum ligula nunc vitae nisl.',
            timestamp: 'May 28, 2023',
            name: 'Ava Thompson',
            likeNumber: 22,
            commentNumber: 5,
        },
        {
            title: 'Post 9',
            content:
                'Nullam quis elit vel nisl fermentum eleifend. Proin at est tellus. Integer bibendum sem et nunc semper aliquam. Maecenas pellentesque nulla id facilisis dignissim. Suspendisse scelerisque, leo vel consequat mattis, leo neque laoreet magna, id consequat ex nisl nec augue. Cras dapibus rhoncus nunc, nec maximus nunc vehicula et. Duis gravida varius ipsum auctor lobortis. Vivamus sit amet laoreet nulla.',
            timestamp: 'May 29, 2023',
            name: 'William Clark',
            likeNumber: 17,
            commentNumber: 6,
        },
        {
            title: 'Post 10',
            content:
                'Sed pharetra efficitur purus, eu fringilla odio vestibulum sed. Cras sed magna finibus, aliquet tellus a, bibendum mi. Suspendisse et tempor massa. Maecenas sagittis ligula odio, non iaculis turpis scelerisque sed. Curabitur tincidunt sem nec dolor dictum pharetra. In cursus venenatis sem, id fringilla quam consectetur in. Fusce efficitur ligula sed lectus dictum, non vulputate erat semper.',
            timestamp: 'May 30, 2023',
            name: 'Emma Turner',
            likeNumber: 20,
            commentNumber: 7,
        },
        {
            title: 'Post 11',
            content:
                'Aliquam varius odio sit amet felis vulputate, ut bibendum nisi efficitur. Nam facilisis lectus sed nibh vulputate semper. Maecenas tincidunt efficitur tristique. Duis efficitur gravida tellus, vitae bibendum sem fermentum at. Nullam finibus elit id magna tristique vestibulum. Sed eu arcu faucibus, congue ipsum a, ultrices nisl. Mauris ac finibus justo. Proin in orci sem.',
            timestamp: 'May 31, 2023',
            name: 'Daniel Harris',
            likeNumber: 15,
            commentNumber: 4,
        },
        {
            title: 'Post 12',
            content:
                'Vestibulum auctor, tortor sed tincidunt faucibus, quam justo rutrum nisi, ut interdum quam nisi nec ligula. Aliquam id metus facilisis, dapibus neque non, pulvinar metus. Fusce sodales ipsum vitae commodo scelerisque. Maecenas id ullamcorper erat, sit amet placerat nisi. Mauris rhoncus, justo ac dapibus aliquet, sem nulla eleifend nisi, non tempor lorem neque et tortor.',
            timestamp: 'June 1, 2023',
            name: 'Liam Martin',
            likeNumber: 19,
            commentNumber: 3,
        },
        {
            title: 'Post 13',
            content:
                'Phasellus vel hendrerit ante. Nullam interdum, ligula a consectetur hendrerit, turpis est viverra nulla, eu hendrerit dolor elit et metus. In tincidunt eros et mauris rutrum, eu euismod metus consequat. Mauris vitae quam id turpis lacinia eleifend. Suspendisse potenti. Curabitur scelerisque quam eu enim gravida, ut tristique risus egestas. Sed luctus sem non diam interdum, sit amet accumsan velit finibus.',
            timestamp: 'June 2, 2023',
            name: 'Olivia Garcia',
            likeNumber: 23,
            commentNumber: 5,
        },
        {
            title: 'Post 14',
            content:
                'Praesent id quam nec ante egestas gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque a interdum odio. Sed auctor est at tempor porttitor. Morbi pharetra sollicitudin rutrum. Sed ultricies luctus turpis, in rhoncus enim interdum et. Nam id justo a risus laoreet feugiat. Proin ut venenatis enim, sit amet luctus velit.',
            timestamp: 'June 3, 2023',
            name: 'Noah Martinez',
            likeNumber: 16,
            commentNumber: 4,
        },
        {
            title: 'Post 15',
            content:
                'Aenean feugiat commodo luctus. In ultricies aliquet ex, in fringilla ex sollicitudin quis. Sed id vestibulum purus. Sed at metus a sem euismod malesuada. Suspendisse maximus, risus non vehicula ultricies, mi lorem auctor ex, eget vestibulum quam est a tellus. Donec volutpat urna nec fringilla tincidunt. Suspendisse fermentum, sem non cursus vestibulum, sapien turpis ullamcorper leo, vitae egestas tellus ipsum eu risus.',
            timestamp: 'June 4, 2023',
            name: 'Isabella Robinson',
            likeNumber: 21,
            commentNumber: 6,
        },
    ]


    const [showModal, setShowModal] = useState(false);
    const [userType, setUserType] = useState(0);
    const [shouldRenderNavBar, setShouldRenderNavBar] = useState(false);

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
    }, [userType]);


    return (
        <Container fluid>
            {userType === 1 ? <CareerExpertNavBar handleClick={handleClick} activeLink="home"/> :
                <NavBar handleClick={handleClick} activeLink="home"/>}
            <Col className="d-inline-block justify-content-center">
                {samplePosts.map((post) => (
                    <Row className="justify-content-center">
                        <PostCard content={post.content} name={post.name} title={post.title}
                        likeNumber={post.likeNumber} commentNumber={post.commentNumber} timestamp={post.timestamp}></PostCard>
                    </Row>
                ))}
            </Col>
        </Container>
    );
};

export default HomePage