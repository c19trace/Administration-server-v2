import './App.css';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import ContactTracing from './components/ContactTracing.js';
import StudentDatabase from './components/StudentDatabase.js';
import TokenDatabase from './components/TokenDatabase.js';

import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { Switch, Route, BrowserRouter } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
      <div className="App">
          <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">c19trace</Navbar.Brand>
            <Nav className="mr-auto">
              <Nav.Link href="/">Login</Nav.Link>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
              <Nav.Link href="/contact-tracing">Contact Tracing</Nav.Link>
              <Nav.Link href="/student-database">Student Database</Nav.Link>
              <Nav.Link href="/token-database">Token Database</Nav.Link>
            </Nav>
          </Navbar>

          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/contact-tracing" component={ContactTracing}/>
            <Route exact path="/student-database" component={StudentDatabase}/>
            <Route exact path="/token-database" component={TokenDatabase}/>
          </Switch>

      </div>
      </BrowserRouter>
  );
}

export default App;
