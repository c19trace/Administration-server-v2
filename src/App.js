import './App.css';
import Login from './components/Login.js';
import Dashboard from './components/Dashboard.js';
import Database from './components/Database.js';

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
              <Nav.Link href="/database">Database</Nav.Link>
            </Nav>
          </Navbar>

          <Switch>
            <Route exact path="/" component={Login}/>
            <Route exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/database" component={Database}/>
          </Switch>

      </div>
      </BrowserRouter>
  );
}

export default App;
