import React, { useEffect, useState } from 'react';
import sendRequest from '../utils/request';
import AdminNavBar from '../components/AdminNavBar';
import { Container, Row, Col, Button, Card, Badge, Image, Modal, Form } from 'react-bootstrap';

const Analysis = () => {

  const [location, setLocation] = useState('');
  const [skill, setSkill] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [analysisData, setAnalysisData] = useState({});

  const handleClick = (e) => {
    e.preventDefault();

    const requestData = {
      location: location,
      skill: skill,
      startDate: startDate,
      endDate: endDate
    };
    // Assuming sendRequest is a function to make the API call
    sendRequest('analysis-1', 'POST', requestData, (data) => {
         // Handle the response data here
    });

  };

  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    //initial send request here
  }, []);

  useEffect(() => {
    sendRequest('analysis', 'POST', {}, (data) => {
      setAnalysisData(data); // Set the response data in state
    });
  }, []);


  return (
    <Container fluid>
      <AdminNavBar activeLink="analysis" />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Rest of your admin page content */}
        <h2 style={{ textAlign: 'center' }}>Analysis</h2>
        <table style={{ width: '80%', border: '1px solid black', borderRadius: '5px', padding: '10px' }}>
          <tbody>
          <tr>
            <th>Top 5 Users with Highest Average Post Likes</th>
            <td>
              {analysisData.top_5_users_avg_likes && analysisData.top_5_users_avg_likes.map((user, index) => (
                  <div key={index}>{user.avg_likes}</div>
              ))}
            </td>
          </tr>
          <tr>
            <th>User with Minimum Number of Comments on Their Post</th>
            <td>
              {analysisData.user_with_min_comments && analysisData.user_with_min_comments.map((user, index) => (
                  <div key={index}>{user.author_name}: {user.min_com}</div>
              ))}
            </td>
          </tr>
          <tr>
            <th>Top 5 Organizations by Number of Applications (Descending Order)</th>
            <td>
              {analysisData.top_5_applications_per_organization && analysisData.top_5_applications_per_organization.map((org, index) => (
                  <div key={index}>{org.j_organization}: {org.application_count}</div>
              ))}
            </td>
          </tr>
          <tr>
            <th>Author of the Most Liked Post</th>
            <td>
              {analysisData.author_most_liked_post && analysisData.author_most_liked_post.map((author, index) => (
                  <div key={index}>{author.author_name}</div>
              ))}
            </td>
          </tr>          </tbody>
        </table>
      </div>
      <div>
        <Form>
          <label>
            Location:
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
          </label>
          <br />
          <label>
            Skill:
            <input type="text" value={skill} onChange={(e) => setSkill(e.target.value)} />
          </label>
          <br />
          <Row className="mt-2">
            <label>
              Start Date:
              <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </label>
            <label>
              End Date:
              <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </label>
          </Row>

          <br />
          <button onClick={handleClick}>Submit</button>
        </Form>
      </div>
    </Container>
  );
};

export default Analysis;
