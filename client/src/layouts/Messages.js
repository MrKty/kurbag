import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Form, Button, Card, Image } from 'react-bootstrap';
import NavBar from "../components/NavBar";
import sendRequest from "../utils/request";

const Messages = () => {

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


    /*




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

    const [conversations, setConversations] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [userType, setUserType] = useState(0);
    const [currentConversation, setCurrentConversation] = useState('');
    const [selectedConversation, setSelectedConversation] = useState(false);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fetch messages for the selected conversation
        sendRequest('messages', 'POST', { conversationId: selectedConversation }, (data) => {
            try {
                setMessages(data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        });
    }, [currentConversation]);


    useEffect(() => {
        // Fetch data from Sends_Request table
        sendRequest('conversations', 'POST', {}, (data) => {
            try {
                setConversations(data);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        });
    }, []);

    const handleClose = () => {
        setShowModal(false);
    };

    const handleConversationClick = (id) => {
        setSelectedConversation(true);
        setCurrentConversation(id)
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
                        <Image src={receiver.profilePhoto}
                               alt={receiver.name} roundedCircle fluid />
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
        <Container fluid>
            <NavBar activeLink="messages"/>
            <Row className={"ms-0 justify-content-center p-2"}>
                <Col className="col-3 mt-3 me-2" style={{backgroundColor: "#b6cdbd"}}>
                    <h2>Recent Conversations</h2>
                    <hr className="fw-bold"/>
                    <Col className="col-12 mt-3 mx-auto" style={{backgroundColor: "#ecebeb", overflowY:"auto", maxHeight:"500px" }}>
                        <Card className={"border p-2"}>

                            <Row className="conversations ms-3">
                                {conversations.map((conversation) => (
                                    <Row className="message-card mb-2" onClick={() => handleConversationClick(conversation.id)}>
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
                    <hr className="fw-bold"/>
                    {selectedConversation ? (
                        <div>
                            <Col className="col-12 mt-3 mb-2 w-100" style={{backgroundColor: "#b6cdbd", overflowY:"auto", maxHeight:"500px"}}>
                                <Row className="messages ms-3">
                                    {messages.map((message) => (
                                        <Row className="message-bubble mb-2">
                                            <MessageCard content={message.content} time={message.time} sender={message.sender}></MessageCard>
                                        </Row>
                                    ))}
                                </Row>
                            </Col>
                            <div className="new-message mt-2">
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
