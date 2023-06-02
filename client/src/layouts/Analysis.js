import React from 'react';
import sendRequest from '../utils/request';
import AdminNavBar from '../components/AdminNavBar';
import {Container, Row, Col, Button, Card, Badge, Image, Modal, Form} from 'react-bootstrap';

const Analysis = () => {
  return (
    <Container fluid>
            <AdminNavBar activeLink="analysis"/>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Rest of your admin page content */}
      
      <h2 style={{ textAlign: 'center' }}>Analysis</h2>
      <table style={{ width: '80%', border: '1px solid black', borderRadius: '5px', padding: '10px' }}>
        <tbody>
          <tr>
            <th>Top 5 Users with Highest Average Post Likes</th>
          </tr>
          <tr>
            <th>User with Minimum Number of Comments on Their Post</th>
          </tr>
          <tr>
            <th>Top 5 Organizations by Number of Applications (Descending Order)</th>
          </tr>
          <tr>
            <th>Author of the Most Liked Post</th>
          </tr>
        </tbody>
      </table>
    </div>
    </Container>
  );
};

export default Analysis;
