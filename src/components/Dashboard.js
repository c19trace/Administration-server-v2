import React from 'react';

import { Container, Row, Col, Card } from "react-bootstrap";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios';
import '../styles.css';

import {
  BarChart, Bar, Brush, Cell, CartesianGrid, ReferenceLine, ReferenceArea,
  XAxis, YAxis, Tooltip, Legend, ErrorBar, LabelList, Rectangle, LineChart, Line
} from 'recharts';
import { scaleOrdinal } from 'd3-scale';
//import { schemeCategory10 } from 'd3-scale-chromatic';


const data = [
  { name: '01/11/2020', checkins: 100, infections: 10, r0: 0.1},
  { name: '02/11/2020', checkins: 200, infections: 50, r0: 0.2},
  { name: '03/11/2020', checkins: 400, infections: 40, r0: 0.8},
  { name: '04/11/2020', checkins: 300, infections: 20, r0: 1.1},
  { name: '05/11/2020', checkins: 250, infections: 10, r0: 0.9},
  { name: '06/11/2020', checkins: 150, infections: 30, r0: 1},
  { name: '07/11/2020', checkins: 50, infections: 70, r0: 1.2},
];

class Dashboard extends React.Component {

    render() {
        return (
            <div className="App">
                    <br />
                    <h3>Dashboard</h3>
                    <br />

                    <Container>

                        <Row className="show-grid">
                        <Col md={6}>

                        <Card >
                          <Card.Body>
                            <Card.Title>Daily Check-ins and confirmed cases</Card.Title>
                            <Card.Text>
                              <BarChart width={500} height={300} data={data} maxBarSize={10} barSize={10}>
                                <XAxis dataKey="name" />
                                <YAxis type="number" dataKey="checkins" />
                                <CartesianGrid horizontal={false} />
                                <Tooltip />
                                <Bar dataKey="checkins" fill="#387908" />
                                <Bar dataKey="infections" fill="#ff0000" />
                              </BarChart>
                            </Card.Text>
                            <Button variant="primary">More Info</Button>
                          </Card.Body>
                        </Card>
                        </Col>

                        <Col md={6}>
                        <Card >
                          <Card.Body>
                            <Card.Title>Reproductive Rate</Card.Title>
                            <Card.Text>
                                <LineChart width={500} height={300} data={data}>
                                    <XAxis dataKey="name"/>
                                    <YAxis/>
                                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                                    <Line type="monotone" dataKey="r0" stroke="#8884d8" />
                                </LineChart>
                            </Card.Text>
                            <Button variant="primary">More Info</Button>
                          </Card.Body>
                        </Card>
                        </Col>
                        </Row>

                    </Container>

            </div>
        );
    }
}

export default Dashboard;

