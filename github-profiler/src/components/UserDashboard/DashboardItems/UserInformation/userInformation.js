import React, { Component } from 'react';
import Nav from 'react-bootstrap/Nav'
import '../../main.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faBook } from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import config from '../../../../config.json'


export default class UserInformation extends Component {
    constructor(props){
        super(props);
        this.state = {
            UserInformation: {}
        }
    }
    getUserInformation = (username) => {
        if(!username){window.location.href = "/"}
        fetch(`https://api.github.com/users/${username}`, {
            method: 'GET',
            mode: "cors",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Basic ${config.apiToken}`
            }
          })
          .then(response => {return response.json()}).then(data =>{
              this.setState({UserInformation: data})
            }) 
        }
        
        componentDidMount() {
            this.getUserInformation(this.props.username)
        }
    
    render() {
        return(

            <div id="sidebar-wrapper">
                <div classname="d-flex" id="wrapper">
                    <div classname="bg-light border-right" id="sidebar-wrapper">
                        <div classname="list-group list-group-flush">
                            <Nav.Item className="p-3"> <h5>{this.state.UserInformation.name}</h5></Nav.Item>
                            
                            <Nav.Item className="p-3 py-4"><img src={this.state.UserInformation.avatar_url} className="rounded-circle img-thumbnail" width="200" alt={this.state.UserInformation.avatar_url}/></Nav.Item>

                            <Nav.Item className="pb-3 px-2 d-flex justify-content-around">
                            <div className="align-self-center">
                                <FontAwesomeIcon icon={faBook} size="1x"/>
                            </div>
                            <div className="flex-grow-1 p-2 border-bottom border-top">
                                {this.state.UserInformation.bio ? this.state.UserInformation.bio : "No Bio Specified" }
                            </div>
                            </Nav.Item>
                            <hr className="my-2" />
                            <Nav.Item className="pb-3 px-2 d-flex justify-content-around">
                            <div className="align-self-center">
                                <FontAwesomeIcon icon={faMapMarkerAlt} size="1x"/>
                            </div>
                            <div className="flex-grow-1">
                                {this.state.UserInformation.location ? this.state.UserInformation.location : "No Location Specified" }
                            </div>
                            </Nav.Item>

                            <Nav.Item className="pb-3 px-2 d-flex justify-content-around">
                            <div className="align-self-center">
                                <FontAwesomeIcon icon={faEnvelope} size="1x"/>
                            </div>
                            <div className="flex-grow-1">
                                {this.state.UserInformation.email ? this.state.UserInformation.email : "No Email" }
                            </div>
                            </Nav.Item>

                            <Nav.Item className="pb-3 px-2 d-flex justify-content-around">
                            <div className="align-self-center">
                                <FontAwesomeIcon icon={faGithub} size="1x"/>
                            </div>
                            <div className="flex-grow-1 pb-1">
                                {this.state.UserInformation.html_url ? <a href={this.state.UserInformation.html_url}>{this.state.UserInformation.login}</a> : "URL Error"}
                            </div>
                            </Nav.Item>                           

                            <Nav.Item className="p-3 border-bottom border-top pb-1"> {this.state.UserInformation.hireable ? this.state.UserInformation.hireable : "Employment Unknown"}</Nav.Item>


                        </div>
                    </div>

                </div>
            </div>
               

        )
  }
}

// export default UserInformation;