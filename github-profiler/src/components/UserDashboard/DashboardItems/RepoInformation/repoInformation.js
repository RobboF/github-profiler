import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import _ from "lodash"
import { Doughnut } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import ListItem from 'react'
import CommitGraph from './commitGraph'
import config from '../../../../config.json'

export default class UserInformation extends Component {
    constructor(props){
        super(props);
        this.state = {
                RepoInformation: {},
                languageGraph: {},
                langCount: "",
                forkedRepos: 0,
                
            }
        }
    
    getUserInformation = (username) => {
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



        getForks = (data) => { 
            console.log(data)
            let forkedRepos = data.filter(forks => {return forks.fork === true})
            this.setState({forkedRepos: forkedRepos.length})
            console.log(forkedRepos.length)

        }
        getFavouriteLanguage = () => {
            let obj = this.state.langCount
            console.log("Favourite Language: ", this.state.langCount)
            // var maxKey = _.max(Object.values(obj), o => obj[o]);
            // console.log(maxKey)
            return Object.keys(obj)[0]
        }
        
        getLanguages = (data) => {
            const langArr = []
            data.map(({language}) => (
                langArr.push(language)
                
                ))
            const langCount = langArr.reduce( (tally, language) => {
                tally[language] = (tally[language] || 0) + 1 ;
                return tally;
            }, {})
            langCount.Other = langCount.null
            delete langCount.null

            // 
            // console.log("TallyKeys ", Object.keys(langCount))
            // console.log("TallyValues ", Object.values(langCount))

            // console.log("TallyCount: ", langCount)
            this.setState({langCount: langCount})
            
           const graph ={
                labels: Object.keys(langCount),
                datasets: [
                  {
                    data: Object.values(langCount),
                    backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360","#F7464A", "#46BFBD", "#FDB45C", "#949FB1", "#4D5360"],
                    hoverBackgroundColor: [
                      "#FF5A5E",
                      "#5AD3D1",
                      "#FFC870",
                      "#A8B3C5",
                      "#616774",
                      "#5AD3D1",
                      "#FFC870",
                      "#A8B3C5",
                      "#616774",
                      "#FF5A5E",
                      "#5AD3D1",
                      "#FFC870",
                      "#A8B3C5",
                      "#616774"
                    ],
                  }
                ]
            }
            this.setState({ languageGraph: graph})
        }

        componentDidMount() {
            this.getUserInformation(this.props.username)
        }
        
    render() {
        return(
            <div className="">
                <Card className="m-1 p-1 my-1 d-flex flex-row justify-content-around bg-light border-0 rounded-0">
                    <Card.Title> Public Repos: {this.state.RepoInformation.length} </Card.Title>
                    <Card.Title> Main Language: {this.getFavouriteLanguage()} </Card.Title>
                    <Card.Title> Forked: {this.state.forkedRepos} </Card.Title>
                </Card>
                <div className="d-flex flex-row h-50">
                <Card className="m-1 p-1 my-1 d-flex flex-wrap bg-light border-0 rounded-0">
                {/* <ul className="list-group list-group-flush flex-d flex-column">
                    {Object.keys(this.state.langCount).map((keys) => 
                       <li className="list-group-item" key={keys}>{keys}: {this.state.langCount[keys]}</li> 
                        )}
                </ul> */}
                    {Object.keys(this.state.langCount).map((keys) => 
                       <Badge pill variant="light" className="m-1" key={keys}>{keys}: {this.state.langCount[keys]}</Badge> 
                        )}
                </Card>
                <Card className="m-1 p-1 my-1 flex-fill d-flex bg-light border-0 rounded-0 w-25 align-items-center">
                    <MDBContainer>
                     <Card.Title className="mb-4">Languages: </Card.Title>
                    <Doughnut data={this.state.languageGraph} options={{ responsive: true, legend:{display: false, position: "bottom"},  }} />
                    </MDBContainer>
                </Card>
                <CommitGraph username={this.props.username} />
                </div>
                
            </div>

        )
  }
}

// export default UserInformation;