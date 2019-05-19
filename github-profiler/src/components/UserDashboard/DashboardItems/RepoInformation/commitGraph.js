import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { MDBContainer } from "mdbreact";
import ListItem from 'react'
import config from '../../../../config.json'
import { Line } from "react-chartjs-2";
import axios from 'axios'
import constructGraphData from './bensGraphing.js'

const axiosGitHubGraphQL = axios.create({
    baseURL: "https://api.github.com/graphql",
    headers: {
        Authorization: `Basic ${config.apiToken}` 
    },
})

export default class CommitGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            userRepoList: [],
            rawData: [],
            graphData: {}
        };
    }

    getGitQuery = () => {
        return(
            `
            query{
                rateLimit{
                    cost
                    remaining
                    resetAt
                }
                user(login: ${this.props.username}){
                repositories(first: 50){
                        edges{
                    node{
                        name
                        ... on Repository{
                        defaultBranchRef{
                            target{
                            ... on Commit{
                                history{
                                edges{
                                    node{
                                    ... on Commit{
                                        committedDate,
                                        message
                                    }
                                    }
                                }
                                }
                            }
                            }
                        }
                        }
                    }
                    }
                }
                } 
            }
        `
        )
    }    

    componentDidMount = () => {
        // console.log(" commit username",this.props.username)
        // this.getRepoList(this.props.username)
        this.onFetchFromGitHub();
    }   
    
    onFetchFromGitHub = () => {
        axiosGitHubGraphQL
          .post('', { query: this.getGitQuery() })
          .then(result => {this.setState({graphData: constructGraphData(result)}, () => console.log("Graph Data from State",this.state.graphData))});
      };
    
      render() {
        return (
            <Card className="m-1 p-1 my-1 flex-fill h-25 d-flex bg-light border-0 rounded-0">  
                     <MDBContainer>
                        <Card.Title>Commit History: </Card.Title>
                        <Line data={this.state.graphData.dataLine} options={{ responsive: true, legend:{display: false, position: "left"},  }} />
                    </MDBContainer>

              
            </Card>
        );
      }
}

// export default CommitGraph;