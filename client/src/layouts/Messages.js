import React, { useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup, Form, Button, Card } from 'react-bootstrap';

const Messages = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedConversation, setSelectedConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
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
    return (
        <Container>
            <Row className={"ms-0 justify-content-center p-2"}>
                <Col className="col-3 mt-3 me-2" style={{backgroundColor: "#B3FFCC"}}>
                    <h2>Recent Conversations</h2>
                    <Col className="col-10 mt-3" style={{backgroundColor: "#ecebeb"}}>
                        <Card className={"border p-2"}>
                            <Row className="border-bottom p-2">
                                CONVERSATION 1
                            </Row>
                            <Row className="border-bottom p-2">
                                CONVERSATION 2
                            </Row>
                            <Row className="border-bottom p-2">
                                CONVERSATION 3
                            </Row>
                            <Row className="border-bottom p-2">
                                CONVERSATION 4
                            </Row>
                            <Row className="border-bottom p-2">
                                CONVERSATION 5
                            </Row>
                            <Row className="border-bottom p-2">
                                CONVERSATION 6
                            </Row>
                        </Card>
                    </Col>
                </Col>
                <Col className="col-3 mt-3" style={{backgroundColor: "#B3FFCC"}}>
                    <h2>Conversation</h2>
                    {selectedConversation ? (
                        <div>
                            <div className="messages">
                                {messages.map((message) => (
                                    <div key={message.id} className="message">
                                        <strong>{message.sender}</strong>: {message.content}
                                    </div>
                                ))}
                            </div>
                            <div className="new-message">
                                <Form>
                                    <Form.Control
                                        type="text"
                                        placeholder="Type your message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                    />
                                    <Button variant="primary" >
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
