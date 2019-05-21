import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';
import { MDBContainer } from "mdbreact";
import { Line } from "react-chartjs-2";

export default class CommitGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataLine: {}
        }
    }

    componentDidMount() {
      console.log(this.props.graphData)
      // this.setState({dataLine: })
    }
    
    render() {
        return (
            <Card className="m-1 p-1 my-1 flex-fill d-flex bg-light border-0 rounded-0">  
                    <MDBContainer>
                        <Card.Title>Commit History: </Card.Title>
                        <Line data={this.props.graphData} options={{ responsive: true, legend:{display: false, position: "left"},  }} />
                    </MDBContainer>

            
            </Card>
        );
    }
}

// export default CommitGraph;