
import React from 'react';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

import '../assets/stylesheets/style.css';

const IP_ALLSTUDENTS = 'http:// /get-students';
const IP_STUDENT = 'http://35.195.7.207:5000/get-student-tokens';
const IP_UPDATE = 'http://35.195.7.207:5000/update-status';

class StudentDatabase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            student: null,
            studentSearch: false,
            isFetching: false,
            students: [],
            tokens: []
        };
    }

    componentDidMount() {
        // Search local storage
        // if ! studentSearch
        var studentSearch = localStorage.getItem('studentSearch');
        
        if(!studentSearch){
            fetch(IP_ALLSTUDENTS, {method:'GET'})
            .then(res=> res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    studentSearch: false,
                    students: result
                });
            }, (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            })
        } else {
            var id = localStorage.getItem('student_id');
            
            fetch(IP_STUDENT, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: id 
                })
            })

            .then(res=> res.json())
            .then((result) => {
                this.setState({
                    isLoaded: true,
                    student: id,
                    studentSearch: true,
                    tokens: result
                });
            }, (error) => {
                this.setState({
                isLoaded: true,
                error
                });
            })
        }
    }
    
    renderStudentTableHeader() {
        let headerElement = ['Student ID', 'First Name', 'Surname', 'E Mail', 'Programme', 'Year', 'Covid Status']
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th> 
        })
    }

    renderStudentTableData() {
      return this.state.students.map((item) => {
         return (
            <tr key={item[0]} >
               <td>{item[0]}</td>
               <td>{item[1]}</td>
               <td>{item[2]}</td>
               <td>{item[3]}</td>
               <td>{item[4]}</td>
               <td>{item[5]}</td>
               <td>{item[6]}</td>
               <td><button key={item[0]} onClick={() => this._storeStudentData(item[0])}>Info</button></td>
            </tr>
         )
      })
   }

    renderTokenStudentHeader() {
        return (
        <tr>
            <th>{this.state.student} </th>
            <th></th>
            <th></th>
            <th><button onClick={() => this._removeStudentData()}>Back</button></th>
        </tr>
        )
    }

    renderTokenTableHeader() {
        // Should be changed. 
        // 1: Student on top
        // 2: Token, date, status
        // 3. Should be a back button which removed from local storage, so next time page loads it will be students.
        let headerElement = ['token', 'date', 'status']
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th> 
        })
    }

    renderTokenTableData() {

    // 2: Token, date, status
      return this.state.tokens.map((item) => {
         return (
            <tr key={item[0]} >
               <td>{item[2]}</td>
               <td>{item[3]}</td>
               <td>{this.statusCheck(item[0], item[4])}</td>
               <td><button key={item[0]} onClick={() => this.updateStatus(item[0], item[4])}>Change Status</button></td>
            </tr>
         )
      })
   }

    _storeStudentData = (id) => {
        // Save id to local storage
        // save studentSearch: true to local storage
        // reload window

        // https://reactnative.dev/docs/asyncstorage

        var studentSearch = localStorage.getItem('studentSearch');
        if(studentSearch == true || studentSearch == false ){

        } else{

            localStorage.setItem('student_id', id);
            localStorage.setItem('studentSearch', true);
            window.location.reload()
        }

    }
    
    _removeStudentData = () => {
        // Remove id from local storage
        // Remove studentSearch from local storage
        // reload window
        localStorage.removeItem('student_id');
        localStorage.removeItem('studentSearch');
        window.location.reload();
    }

    updateStatus(id, status){
        let s = (status == 0) ? 1: 0; 
        fetch(IP_UPDATE, {
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
        const { error, isLoaded, studentSearch, students, tokens} = this.state;
        if (error) {
        return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
        return <div>Loading...</div>;
        } else if(studentSearch){
            return (
                <div className="App">
                    <br></br>
                    <table id='tokens' getTrProps={this.onRowClick}>
                    <tbody>
                        {this.renderTokenStudentHeader()}
                        <tr>{this.renderTokenTableHeader()}</tr>
                        {this.renderTokenTableData()}
                    </tbody>
                    </table>                
                </div>
            );
        } else {
            return (
            <div className="App">
                <br></br>
                <table id='students' getTrProps={this.onRowClick}>
                <tbody>
                    <tr>{this.renderStudentTableHeader()}</tr>
                    {this.renderStudentTableData()}
                </tbody>
                </table>                
            </div>
            );
        }
    }

}

export default StudentDatabase;
