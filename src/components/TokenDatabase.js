import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import '../assets/stylesheets/style.css';

const IP0 = 'http://35.195.7.207:5000';
const IP = IP0 + '/get-tokens';
const IP2 = IP0 + '/update-status';

class TokenDatabase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isFetching: false,
            tokens: []
        };
    }

    componentDidMount() {
        fetch(IP, {method:'GET'})
        .then(res=> res.json())
        .then((result) => {
            this.setState({
                isLoaded: true,
                tokens: result
            });
        }, (error) => {
            this.setState({
            isLoaded: true,
            error
            });
        }
    )}
    
    renderTableHeader() {
        let headerElement = ['id', 'G_Num', 'token', 'date', 'status']
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th> 
        })
    }

    renderTableData() {
      return this.state.tokens.map((item) => {
         return (
            <tr key={item[0]} >
               <td>{item[0]}</td>
               <td>{item[1]}</td>
               <td>{item[2]}</td>
               <td>{item[3]}</td>
               <td>{this.statusCheck(item[0], item[4])}</td>
               <td><button key={item[0]} onClick={() => this.updateStatus(item[0], item[4])}>Change Status</button></td>
            </tr>
         )
      })
   }

    updateStatus(id, status){
        let s = (status == 0) ? 1: 0; 
        fetch(IP2, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  id: id, 
                  status: s
              })
          }).then(()=>{
            window.location.reload();
          }).catch(function(error) {
              console.log(error);
          });
    }

    statusCheck = (id, status) => {
        return status == 0 ? "No exposure detected.": "Exposure detected.";

    }

    render(){
        const { error, isLoaded, tokens} = this.state;
        if (error) {
        return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Loading...</div>;
        } else {
        return (
            <div className="App">
                <br></br>
                <table id='tokens' getTrProps={this.onRowClick}>
                <tbody>
                    <tr>{this.renderTableHeader()}</tr>
                    {this.renderTableData()}
                </tbody>
                </table>                
            </div>
        );
        }  
    }

}

export default TokenDatabase;