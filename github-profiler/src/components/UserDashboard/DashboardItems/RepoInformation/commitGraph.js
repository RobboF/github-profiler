import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import ListItem from 'react'
import config from '../../../../config.json'


export default class CommitGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            }
        }
    
    getCommitGraph = (username) => {
        // if(!username){window.location.href = "/"}
        fetch(`https://api.github.com/users/${username}/repos`, {
            method: 'GET',
            mode: "cors",
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': `Basic ${config.apiToken}` 
            //   'Authorization': 'Basic afcda424d27073fd1ff6faa45d975c0cb7f14faf'
            }
          })
          .then(response => {return response.json()}).then(data =>{
              this.setState({RepoInformation: data})
              this.getLanguages(data)
              this.getForks(data)
            }) 
        }
 
    render() {
        return(
            <div className="">
                <Card className="m-1 p-1 my-2">
                    <p>Hi </p>
                </Card>
            </div>

        )
  }
}

// export default CommitGraph;