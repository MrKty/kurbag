import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Form, Button, Card, Image } from 'react-bootstrap';
import NavBar from "../components/NavBar";


const data = [
    {
        position: 'Data Analyst',
        company: 'Nokia',
        location: 'Istanbul, Turkey (remote)',
        image: 'https://media.licdn.com/dms/image/C4E0BAQGL8hpduEqGKQ/company-logo_100_100/0/1677420438777?e=1689811200&v=beta&t=uq7I20tbAw4q7rAxupek6VeDqkMf_0FUr2sKi-elvTw',
    },
    {
        position: 'Data Analyst',
        company: 'Sony',
        location: 'Istanbul, Turkey (remote)',
        image: 'https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ',
    },
    {
        position: 'SQL Developer',
        company: 'IBM',
        location: 'New York, NY (remote)',
        image: "data:image/png;base64,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"
    },

    {
        position: 'Database Administrator',
        company: 'Microsoft',
        location: 'Seattle, WA (remote)',
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAOVBMVEXxURuAzCgAre/7vAn////xTxeCzTCFzjjxVifxWjAksO/7viYZru/7vRvxTRLxVCPyXziIzj/7vzAS7Np6AAABD0lEQVR4nO3P2xGCUBAFwVXBtyLkH6yf3giOtdqTwFRXpZrP06fjLlYMSEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhISEhI2FE4p3ouXxJeYr0G4XqKVdOvR9g/wv4R9o+wf4T9q2uuYbvdYtU+1n0QPg6xCAkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCf9Z+Abf/3bA/sfZagAAAABJRU5ErkJggg==',
    },

    {
        position: 'Data Engineer',
        company: 'Amazon',
        location: 'San Francisco, CA (remote)',
        image: 'data:image/png;base64,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',
    }
    // more data objects here...
];

const Messages = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    const sampleMessages = [
        {
            sender: 'Mert Unlu',
            time:   '14:06',
            content:'Ilk mesaj'
        },
        {
            sender: 'Mert Unlu',
            time:   '14:07',
            content:'Ikinci mesaj'
        },
        {
            sender: 'Mert Unlu',
            time:   '14:15',
            content:'Three'
        },
        {
            sender: 'Mert Unlu',
            time:   '16:36',
            content:'4 and the last.'
        },
        {
            sender: 'Mert Unlu',
            time:   '14:06',
            content:'Ilk mesaj'
        },
        {
            sender: 'Mert Unlu',
            time:   '14:07',
            content:'Ikinci mesaj'
        },
        {
            sender: 'Mert Unlu',
            time:   '14:15',
            content:'Three'
        },
        {
            sender: 'Mert Unlu',
            time:   '16:36',
            content:'4 and the last.'
        },
        {
            sender: 'Mert Unlu',
            time:   '14:06',
            content:'Ilk mesaj'
        },
        {
            sender: 'Mert Unlu',
            time:   '14:07',
            content:'Did you watch the latest episode? jahsgdjhasgdhjasgdas asjdhgajshdgjahsgdasjhgd asdjhgasjhdgashjgdahjsdgs ajshdgasjhdgasjhgdjhasgd jahgsdjhgashjdgsajhgdjas jhasdgjhsagd'
        },
        {
            sender: 'Mert Unlu',
            time:   '14:15',
            content:'Did you watch the latest episode? jahsgdjhasgdhjasgdas asjdhgajshdgjahsgdasjhgd asdjhgasjhdgashjgdahjsdgs ajshdgasjhdgasjhgdjhasgd jahgsdjhgashjdgsajhgdjas jhasdgjhsagd'
        },
        {
            sender: 'Mert Unlu',
            time:   '16:36',
            content:'4 and the last.'
        },
    ]

    const sampleConversations = [
        {
            id: 1,
            receiver: {
                name: 'John Doe',
                profilePhoto: 'https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ',
            },
            time: '10:30 AM',
            lastMessage: 'Hey, how are you?',
        },
        {
            id: 2,
            receiver: {
                name: 'Jane Smith',
                profilePhoto: 'https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ',
            },
            time: '12:45 PM',
            lastMessage: 'Are you free this weekend?',
        },
        {
            id: 3,
            receiver: {
                name: 'Alex Johnson',
                profilePhoto: 'https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ',
            },
            time: '3:20 PM',
            lastMessage: 'Can you send me the document?',
        },
        {
            id: 4,
            receiver: {
                name: 'Emily Brown',
                profilePhoto: 'https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ',
            },
            time: '5:10 PM',
            lastMessage: 'Lets meet at the café.',
        },
        {
            id: 5,
            receiver: {
                name: 'Michael Wilson',
                profilePhoto: 'https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ',
            },
            time: '7:30 PM',
            lastMessage: 'Did you watch the latest episode? jahsgdjhasgdhjasgdas asjdhgajshdgjahsgdasjhgd asdjhgasjhdgashjgdahjsdgs ajshdgasjhdgasjhgdjhasgd jahgsdjhgashjdgsajhgdjas jhasdgjhsagd',
        },
        {
            id: 6,
            receiver: {
                name: 'Sophia Lee',
                profilePhoto: 'https://media.licdn.com/dms/image/C560BAQFeD2stV0OSRQ/company-logo_100_100/0/1573437846744?e=1689811200&v=beta&t=SsNwdP4WCbCt2_R-k_WeH3teobB2pe-pFTU3G3VMOgQ',
            },
            time: '9:15 PM',
            lastMessage: 'See you tomorrow!',
        },
    ];


    /*
        useEffect(() => {

            // Fetch conversations from the server
            const fetchConversations = async () => {
                try {
                    const response = await fetch('/api/conversations');
                    const data = await response.json();
                    setConversations(data);
                } catch (error) {
                    console.error('Error fetching conversations:', error);
                }
            };
            fetchConversations();
        }, []);

        useEffect(() => {
            // Fetch messages for the selected conversation
            const fetchMessages = async () => {
                if (selectedConversation) {
                    try {
                        const response = await fetch(`/api/conversations/${selectedConversation.id}/messages`);
                        const data = await response.json();
                        setMessages(data);
                    } catch (error) {
                        console.error('Error fetching messages:', error);
                    }
                }
            };
            fetchMessages();
        }, [selectedConversation]);

        const handleConversationClick = (conversation) => {
            setSelectedConversation(conversation);
        };

        const handleSendMessage = async () => {
            if (!newMessage) return;

            try {
                await fetch(`/api/conversations/${selectedConversation.id}/messages`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ content: newMessage }),
                });
                setNewMessage('');
            } catch (error) {
                console.error('Error sending message:', error);
            }
        };
    */
    const handleClick = () => {
    };



    const MessageCard = ({ content, time, sender }) => {
        return (
            <Card>
                <Card.Body>
                    <Card.Title>{sender}</Card.Title>
                    <Card.Subtitle className="text-muted">{time}</Card.Subtitle>
                    <Card.Text className="mt-2">{content}</Card.Text>
                </Card.Body>
            </Card>
        );
    };


    const Conversation = ({ id, receiver, time, lastMessage }) => {
        return (
            <Card>
                <Row className="conversation">
                    <Col className={"profile-image align-self-center"} md={3}>
                        <Image src={receiver.profilePhoto} alt={receiver.name} roundedCircle fluid />
                    </Col>
                    <Col md={9}>
                        <Row className="conversation-details">
                            <Col>
                                <h5>{receiver.name}</h5>
                            </Col>
                        </Row>
                        <Row className="conversation-details">
                            <Col>
                                <p className="last-message">{lastMessage}</p>
                            </Col>
                        </Row>
                        <Row className="conversation-details">
                            <Col>
                                <p className="time text-muted">{time}</p>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>
        );
    };

    return (
        <Container>
            <NavBar handleClick={handleClick} activeLink="messages"/>
            <Row className={"ms-0 justify-content-center p-2"}>
                <Col className="col-3 mt-3 me-2" style={{backgroundColor: "#b6cdbd"}}>
                    <h2>Recent Conversations</h2>
                    <Col className="col-12 mt-3 mx-auto" style={{backgroundColor: "#ecebeb", overflowY:"auto", maxHeight:"500px" }}>
                        <Card className={"border p-2"}>

                            <Row className="conversations ms-3">
                                {sampleConversations.map((conversation) => (
                                    <Row className="message-card mb-2">
                                        <Conversation
                                            id={conversation.id}
                                            time={conversation.time}
                                            receiver={conversation.receiver}
                                            lastMessage={conversation.lastMessage}></Conversation>
                                    </Row>
                                ))}
                            </Row>
                        </Card>
                    </Col>
                </Col>
                <Col className="col-5 mt-3 w-50" style={{backgroundColor: "#b6cdbd"}}>
                    <h2>Conversation</h2>
                    {1 ? (
                        <div>
                            <Col className="col-12 mt-3 w-100" style={{backgroundColor: "#b6cdbd", overflowY:"auto", maxHeight:"500px"}}>
                                <Row className="messages ms-3">
                                    {sampleMessages.map((message) => (
                                        <Row className="message-bubble mb-2">
                                            <MessageCard content={message.content} time={message.time} sender={message.sender}></MessageCard>
                                        </Row>
                                    ))}
                                </Row>
                            </Col>
                            <div className="new-message">
                                <Form>
                                    <Form.Control
                                        type="text"
                                        placeholder="Type your message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                    <Button variant="outline-primary" className={"d-block mx-auto mt-2 mb-2"} >
                                        Send
                                    </Button>
                                </Form>
                            </div>
                        </div>
                    ) : (
                        <div className="text-muted">Select a conversation to view messages</div>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Messages
