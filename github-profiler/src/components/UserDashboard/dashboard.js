import React, { Component } from 'react';
import NavBar from '../Navbar/navbar'
import UserInformation from '../UserDashboard/DashboardItems/UserInformation/userInformation'
class Dashboard extends Component {

    render() {
    return(
        <div>
            <NavBar/>
            <div>
                <UserInformation username={this.props.userURL}/>
            </div>
        </div>

    )
  }
}

export default Dashboard;