import React from 'react';
import '../assets/stylesheets/style.css';

const IP = 'http:// :5000'
const ROUTE_GET_STUDENTS = IP + '/get-students';
const ROUTE_GET_STUDENT_TOKENS = IP + '/get-student-tokens';
const ROUTE_UPDATE_TOKEN_STATUS = IP + '/update-token-status';
const ROUTE_UPDATE_STUDENT_STATUS = IP + '/update-student-status';
const ROUTE_DELETE_TOKEN = IP + '/delete-token';

class Database extends React.Component {
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
        var studentSearch = localStorage.getItem('studentSearch');
        
        if(!studentSearch){
            fetch(ROUTE_GET_STUDENTS, {method:'GET'})
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
            
            fetch(ROUTE_GET_STUDENT_TOKENS, {
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
               <td><button key={item[0]} onClick={() => this.updateStudentStatus(item[0], item[6])}>Change Status</button></td>
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
        let headerElement = ['token', 'date', 'status']
        return headerElement.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th> 
        })
    }

    renderTokenTableData() {
      return this.state.tokens.map((item) => {
         return (
            <tr key={item[0]} >
               <td>{item[2]}</td>
               <td>{item[3]}</td>
               <td>{this.statusCheck(item[0], item[4])}</td>
               <td><button key={item[0]} onClick={() => this.updateTokenStatus(item[0], item[4])}>Change Status</button></td>
               <td><button key={item[0]} onClick={() => this.deleteToken(item[0])}>Delete token</button></td>
            </tr>
         )
      })
   }

    _storeStudentData = (id) => {
        var studentSearch = localStorage.getItem('studentSearch');
        if(studentSearch == true || studentSearch == false ){

        } else{

            localStorage.setItem('student_id', id);
            localStorage.setItem('studentSearch', true);
            window.location.reload()
        }

    }
    
    _removeStudentData = () => {
        localStorage.removeItem('student_id');
        localStorage.removeItem('studentSearch');
        window.location.reload();
    }

    updateStudentStatus(id, status){
        let s = (status == 0) ? 1: 0; 
        fetch(ROUTE_UPDATE_STUDENT_STATUS, {
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

    updateTokenStatus(id, status){
        let s = (status == 0) ? 1: 0; 
        fetch(ROUTE_UPDATE_TOKEN_STATUS, {
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

    deleteToken(id){
        fetch(ROUTE_DELETE_TOKEN, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  id: id, 
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

export default Database;
