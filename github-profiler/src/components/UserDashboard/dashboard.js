import React, { Component } from 'react';
import NavBar from '../Navbar/navbar'
import UserInformation from '../UserDashboard/DashboardItems/UserInformation/userInformation'
import RepoInformation from './DashboardItems/RepoInformation/repoInformation'
import CommitGraph from './DashboardItems/RepoInformation/commitGraph'
import constructGraphData from './DashboardItems/RepoInformation/bensGraphing'
import axios from 'axios'
import config from "../../config.json"

const axiosGitHubGraphQL = axios.create({
    baseURL: "https://api.github.com/graphql",
    headers: {
        Authorization: `Basic ${config.apiToken}` 
    },
})

class Dashboard extends Component {
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
                user(login: ${this.props.userURL}){
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
      this.fetchFromGithub()
    }   
    
    fetchFromGithub(){
        axiosGitHubGraphQL
          .post('', { query: this.getGitQuery() })
          .then(result => {this.setState({graphData: constructGraphData(result)}, () => { console.log(this.state.graphData);  return <CommitGraph graphLine={this.state.graphData} /> })});
    };
    render() {
        return(
            <div>
                <NavBar/>
                <div className="d-flex">
                    <UserInformation username={this.props.userURL}/>
                    <div id="page-content-wrapper">
                        <div className="container-fluid">
                            <RepoInformation username={this.props.userURL}/>
                            { this.fetchFromGithub() }
                            
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Dashboard;