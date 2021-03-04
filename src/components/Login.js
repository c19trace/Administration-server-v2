import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import axios from 'axios';


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        };

        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
    }

    handleUsername(event) {
        this.setState({username: event.target.value});
    }

    handlePassword(event) {
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        this.checkLogin({
            username: this.state.username,
            password: this.state.password,
        })

        event.preventDefault();
    }

    checkLogin(loginData) {
        console.log(loginData);

        axios.post('http://localhost:4000/checklogin', loginData)
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
                <h1>Login</h1>
                <Form style={{width:500, margin:"auto"}} onSubmit={this.handleSubmit}>
                  <Form.Group controlId="formBasicEmail">
                    <Form.Control type="text" value={this.state.username} onChange={this.handleUsername}  placeholder="Enter username" />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                    <Form.Control type="password" value={this.state.password} onChange={this.handlePassword}  placeholder="Password" />
                  </Form.Group>

                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form>
            </div>
        );
    }
}

export default Login;

