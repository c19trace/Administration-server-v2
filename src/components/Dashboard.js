import React from 'react';
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, Area, AreaChart
} from 'recharts';
import '../styles.css';

const IP = 'http://:5000/get-monthly-checkins';

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
      var checkins, infections, infectionPercent

      fetch(IP, {method:'GET'})
      .then(res=> res.json())
      .then((result) => {

        Object.keys(result).forEach(function(i) {
          checkins = result[i][1]
          infections = result[i][2]
          infectionPercent = infections / checkins * 100

          switch (result[i][0]){
            case "01":
            data[3] = { name: 'JAN', checkins: checkins, infections: infections, infection_percent: infectionPercent}
            break;
            case "02":
            data[4] = { name: 'FEB', checkins: checkins, infections: infections, infection_percent: infectionPercent}
            break;
            case "03":
            data[5] = { name: 'MAR', checkins: checkins, infections: infections, infection_percent: infectionPercent}
            break;
            case "04":
            data[6] = { name: 'APR', checkins: checkins, infections: infections, infection_percent: infectionPercent}
            break;
            case "05":
            data[7] = { name: 'MAY', checkins: checkins, infections: infections, infection_percent: infectionPercent}
            break;
            case "10":
            data[0] = { name: 'OCT', checkins: checkins, infections: infections, infection_percent: infectionPercent}
            break;
            case "11":
            data[1] = { name: 'NOV', checkins: checkins, infections: infections, infection_percent: infectionPercent}
            break;
            case "12":
            data[2] = { name: 'DEC', checkins: checkins, infections: infections, infection_percent: infectionPercent}
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
                <Bar dataKey="checkins" fill="#488f31" />
                <Bar dataKey="infections" fill="#de425b" />
              </BarChart>
            </Card.Text>
          </Card.Body>
        </Card>
      )
    }

    renderInfectionPercent(){
      return(
        <Card >
          <Card.Body>
            <Card.Title>Infection Percent</Card.Title>
            <Card.Text>
                <AreaChart width={500} height={300} data={this.state.data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#f5bc6b" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#f5bc6b" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area type="monotone" dataKey="infection_percent" stroke="#f5bc6b" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </Card.Text>
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
                    {this.renderInfectionPercent()}
                  </Col>
                  </Row>
              </Container>
          </div>
        );
        }
    }
}

export default Dashboard;
