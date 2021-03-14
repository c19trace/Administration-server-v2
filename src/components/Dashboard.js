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
import DeviceBatteryCharging20 from 'material-ui/svg-icons/device/battery-charging-20';
//import { schemeCategory10 } from 'd3-scale-chromatic';


const IP0 = 'http://:5000';
const IP = IP0 + '/get-monthly-checkins';

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isFetching: false,
            data: [] 
        };
    }

    componentDidMount(){
      var data = []
      var checkins, infections, reproduction

      fetch(IP, {method:'GET'})
      .then(res=> res.json())
      .then((result) => {

        Object.keys(result).forEach(function(i) {
          checkins = result[i][1]
          infections = result[i][2]
          reproduction = infections/checkins*infections

          switch (result[i][0]){
            case "01":
            data[3] = { name: 'JAN', checkins: checkins, infections: infections, r0: reproduction}
            break;
            case "02":
            data[4] = { name: 'FEB', checkins: checkins, infections: infections, r0: reproduction}
            break;
            case "03":
            data[5] = { name: 'MAR', checkins: checkins, infections: infections, r0: reproduction}
            break;
            case "04":
            data[6] = { name: 'APR', checkins: checkins, infections: infections, r0: reproduction}
            break;
            case "05":
            data[7] = { name: 'MAY', checkins: checkins, infections: infections, r0: reproduction}
            break;
            case "10":
            data[0] = { name: 'OCT', checkins: checkins, infections: infections, r0: reproduction}
            break;
            case "11":
            data[1] = { name: 'NOV', checkins: checkins, infections: infections, r0: reproduction}
            break;
            case "12":
            data[2] = { name: 'DEC', checkins: checkins, infections: infections, r0: reproduction}
            break;
            case "06":
            case "07":
            case "08":
            case "09":
            default:
          }
        })
            this.setState({
                isLoaded: true,
                data: data 
            });
        }, (error) => {
            this.setState({
            isLoaded: true,
            error
            });
        } 
      )
    }

    renderMonthlyReport(){
      return(
        <Card >
          <Card.Body>
            <Card.Title>Monthly Check-ins and confirmed cases</Card.Title>
            <Card.Text>
              <BarChart width={500} height={300} data={this.state.data} maxBarSize={10} barSize={10}>
                <XAxis dataKey="name" />
                <YAxis type="number" dataKey="checkins" />
                <CartesianGrid horizontal={false} />
                <Tooltip />
                <Bar dataKey="checkins" fill="#008000" />
                <Bar dataKey="infections" fill="#FF0000" />
              </BarChart>
            </Card.Text>
            <Button variant="primary">More Info</Button>
          </Card.Body>
        </Card>
      )
    }

    renderReproductiveRate(){
      return(
        <Card >
          <Card.Body>
            <Card.Title>Reproductive Rate</Card.Title>
            <Card.Text>
                <LineChart width={500} height={300} data={this.state.data}>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <CartesianGrid stroke="#eee" strokeDasharray="5 5"/>
                    <Line type="monotone" dataKey="r0" stroke="#8884d8" />
                </LineChart>
            </Card.Text>
            <Button variant="primary">More Info</Button>
          </Card.Body>
        </Card>
      )
    }

    render() {
        const { error, isLoaded, data} = this.state;
        if (error) {
        return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Loading...</div>;
        } else {
        return(
            <div className="App">
                    <br />
                    <h3>Dashboard</h3>
                    <br />

                    <Container>
                        <Row className="show-grid">
                        <Col md={6}>
                          {this.renderMonthlyReport()}
                        </Col>
                        <Col md={6}>
                          {this.renderReproductiveRate()}
                        </Col>
                        </Row>
                    </Container>
            </div>
        );
        }
    }
}

export default Dashboard;
