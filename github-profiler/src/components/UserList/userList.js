import React from 'react';
import Container from 'react-bootstrap/Container'
import UserItem from '../UserItem/userItem.js'


function UserList(props) {
  return (
        // <Container className="justifyContent w-50">
        //     <UserItem userList={props.userList}/>
        // </Container>        

        <Container className="list-group d-flex justify-content-center">
            <UserItem userList={props.userList} getSelectedUser={props.getSelectedUser}/>
        </Container>
  );
}

export default UserList;