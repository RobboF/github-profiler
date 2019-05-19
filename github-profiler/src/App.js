import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import GetUser from './components/GetUser/getUser'
import Dashboard from './components/UserDashboard/dashboard'

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            selectedUser: ""
            }
        }
    getSelectedUser = (userURL) => {
        this.setState({selectedUser: userURL}) 
    }

  render() {
    return (
      <div style={styles.appContainer}> 
        <Router>
          <div className="App">
            <div>
            <Route exact path="/" render={(props => <GetUser getSelectedUser={this.getSelectedUser}/>)}/>
            <Route exact path="/user" render={(props => <Dashboard userURL={this.state.selectedUser}/>)}/>

            </div> 
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

const styles = {
  appContainer: {
    // flex: 1,
    height: "100vh"
    // flexDirection: 'column',
    // justifyContent: "space-between",
    // overflowY: 'none',
  }
}