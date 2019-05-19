import React from 'react';
import TopBar from '../Navbar/navbar.js'
import SearchBar from '../UserSearch/userSearch.js';
import UserList from '../UserList/userList'
import config from '../../config.json'
class GetUser extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userArray: null
            }
        }
    userSearch = (username) => {
        fetch(` https://api.github.com/search/users?q=${username}`, {
            method: 'GET',
            mode: "cors",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Basic ${config.apiToken}`
            //   'Authorization': 'Basic afcda424d27073fd1ff6faa45d975c0cb7f14faf'
            }
          })
          .then(response => {return response.json()}).then(data =>{this.setState({userArray: data.items})})    
          
    }

    displayUserList = (props) => {
        if (this.state.userArray){
            return (
                    <UserList userList={this.state.userArray} getSelectedUser={this.props.getSelectedUser}/>
            )
        }
    }
    
    render(){
        return (
          <div className="GetUser">
              <TopBar/>
              <SearchBar userSearch={this.userSearch}/>
              {this.displayUserList()}
          </div>
        );
    }
}

export default GetUser;
