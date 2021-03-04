import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import axios from 'axios';

class ContactTracing extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            randomIds: ''
        };

        this.handleRandomIds = this.handleRandomIds.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }


    handleRandomIds(event) {
        this.setState({randomIds: event.target.value});
    }

    handleDate(date) {
        this.setState({date: date});
        console.log(this.state.date);
    }

    handleSearch(event) {
        this.searchRandomIds({
            date: this.state.date })

        event.preventDefault();
    }

    searchRandomIds(data) {
        console.log(data);

        axios.post('http://localhost:4000/searchids', data)
        .then(res => {
            console.log(res.data);
            this.setState({ randomIds: res.data});
        }).catch((err) => {
            console.log(err);
        });
    }

    handleSubmit(randomIds) {
        console.log(randomIds);

        axios.post('http://localhost:3000/submit-exposure-list', randomIds)
        .then(res => {
            if (res.data === "login ok") {

            }
            else {
                alert("Invalid login credentials");
            }
        }).catch((err) => {
            console.log(err);
        });

    }

    render() {
        return (
            <div className="App">
                <br />
                <h1>Contact Tracing</h1>
                <h3>Send an exposure notification</h3>
                <p>Use this form to anonymously notify students that they may have come into contact with a person who has tested positive for COVID-19.</p>
                <Form style={{width:500, margin:"auto"}} onSubmit={this.handleSearch}>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Enter date and time of exposure:</Form.Label>
                    <Form.Label>
                     <DatePicker selected={this.state.date} onChange={this.handleDate} showTimeSelect dateFormat="dd/mm/yyyy HH:mm" />
                    </Form.Label>
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Choose degree/year/group:</Form.Label>
                    <Form.Label>
                        <Form.Control type="text" value={this.state.degree} placeholder="Software Development Y4" />
                    </Form.Label>
                  </Form.Group>

                  <Button variant="primary" type="get random id's">
                    Find Random Id's
                  </Button>
                </Form>

                <br />
                <Form style={{width:500, margin:"auto"}} onSubmit={this.handleSearch}>
                  <Form.Group controlId="formBasicPassword">
                    <Form.Label>Random Ids to send notifications to: </Form.Label>
                    <Form.Label>
                     <textarea style={{width:500, height:400, margin:"auto"}} value={this.state.randomIds} onChange={this.handleRandomIds} />
                    </Form.Label>
                  </Form.Group>

                  <Button variant="primary" type="get random id's">
                    Add to exposure list
                  </Button>
                </Form>
            </div>
        );
    }
}

export default ContactTracing;

