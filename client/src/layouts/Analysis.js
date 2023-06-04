import React, { useEffect, useState } from 'react';
import sendRequest from '../utils/request';
import AdminNavBar from '../components/AdminNavBar';
import { Container, Row, Col, Button, Card, Badge, Image, Modal, Form } from 'react-bootstrap';
import {Page, Text, View, Document, StyleSheet, pdf} from '@react-pdf/renderer';

const Analysis = () => {

  const [location, setLocation] = useState('');
  const [skill, setSkill] = useState('');
  const [query, setQuery] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [analysisData, setAnalysisData] = useState({});
  const [rows, setRows] = useState([]);
  const [headers, setHeaders] = useState([]);
  const [jobTypeStats, setJobTypeStats] = useState({
    full_time_job_count: null,
    part_time_job_count: null,
    internship_job_count: null
  });

  const DataTable = () => {
    if (headers.length === 0 || rows.length === 0) {
      return null; // Return null if there are no headers or rows
    }

    return (
        <table className="table table-bordered table-striped">
          <thead>
          <tr>
            {headers.map((header, index) => (
                <th key={index}>{header}</th>
            ))}
          </tr>
          </thead>
          <tbody>
          {rows.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                ))}
              </tr>
          ))}
          </tbody>
        </table>
    );
  };



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
        setJobTypeStats(data.table[0])
        console.log(jobTypeStats)
    });

  };

  const handlePrintToPdf = () => {
    window.print();
  };

  const handleQueryButtonClick = (e) => {
    e.preventDefault();

    // Assuming sendRequest is a function to make the API call
    sendRequest('analysis-3', 'POST', {query}, (data) => {
      // Handle the response data here
      setRows(data.rows);
      setHeaders(data.headers);
      console.log(headers);
      console.log(rows);
    });

  };

  useEffect(() => {
    const user_id = localStorage.getItem("userId");
    //initial send request here
  }, []);

  useEffect(() => {
    sendRequest('analysis', 'POST', {}, (data) => {
      setAnalysisData(data);
      console.log(analysisData);
    });
  }, []);


  return (

            <Container fluid>
              <Row>
                <Col className="col-1 mt-1">
                  <Button href="/login" className="ml-auto mb-1">LOGOUT</Button>
                </Col>
              </Row>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Rest of your admin page content */}
                <h2 style={{ textAlign: 'center' }}>Analysis</h2>

                <table className="table table-bordered table-striped">
                  <tbody>
                  <tr>
                    <th>Top 5 Users with Highest Average Post Likes</th>
                    <td>
                      {analysisData.top_5_users_avg_likes &&
                          analysisData.top_5_users_avg_likes.map((user, index) => (
                              <div key={index}>{user.mail_addr} -> {user.avg_likes}</div>
                          ))}
                    </td>
                  </tr>
                  <tr>
                    <th>User with Minimum Number of Comments on Their Post</th>
                    <td>
                      {analysisData.user_with_min_comments &&
                          analysisData.user_with_min_comments.map((user, index) => (
                              <div key={index}>{user.author_name} -> {user.min_com}</div>
                          ))}
                    </td>
                  </tr>
                  <tr>
                    <th>Top 5 Organizations by Number of Applications (Descending Order)</th>
                    <td>
                      {analysisData.top_5_applications_per_organization &&
                          analysisData.top_5_applications_per_organization.map((org, index) => (
                              <div key={index}>{org.j_organization}: {org.application_count}</div>
                          ))}
                    </td>
                  </tr>
                  <tr>
                    <th>Author of the Most Liked Post</th>
                    <td>
                      {analysisData.author_most_liked_post &&
                          analysisData.author_most_liked_post.map((author, index) => (
                              <div key={index}>{author.author_name}</div>
                          ))}
                    </td>
                  </tr>
                  </tbody>
                </table>


              </div>
              <hr/>
              <Row className="align-items-center border-dark">
                <Col className="col-3">
                  <Form className="mt-4">
                    <label className="mb-2">
                      Location:
                      <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                    </label>
                    <br/>

                    <label className="mb-2">
                      Skill:
                      <input type="text" value={skill} onChange={(e) => setSkill(e.target.value)} />
                    </label>
                    <br/>
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
                    <br/>
                    <button onClick={handleClick}>Submit</button>
                  </Form>
                </Col>
                <Col className="col-3">
                    <strong>Job Type Statistics:</strong>
                    <ul>
                      <li>Full-time Jobs: {jobTypeStats.full_time_job_count}</li>
                      <li>Part-time Jobs: {jobTypeStats.part_time_job_count}</li>
                      <li>Internship Jobs: {jobTypeStats.internship_job_count}</li>
                    </ul>
                </Col>
              </Row>
              <hr/>
              <div>
                <Form className="mt-4">
                  <Row className="align-items-end mb-3">
                    <Col>
                      <Form.Label className="mb-0">Query:</Form.Label>
                      <Form.Control type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
                    </Col>
                    <Col>
                      <Button onClick={handleQueryButtonClick} className="ms-4">
                        Request Query
                      </Button>
                    </Col>
                    <Col>
                      Current Query: {query}
                    </Col>
                  </Row>
                </Form>
              </div>
              <DataTable/>
              <Button onClick={handlePrintToPdf} className="mt-3 mb-2">Save as PDF</Button>
            </Container>
  );
};

export default Analysis;
