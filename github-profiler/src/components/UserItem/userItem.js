import React from 'react';
import { Link } from 'react-router-dom'
function UserItem(props) {
    return props.userList.map(({login, avatar_url, html_url}) => (
        <div className="d-flex justify-content-center" key={login}>
            <Link to='/user' className="list-group-item list-group-item-action w-50 justify-content-center" onClick={(e)=>{props.getSelectedUser(login)}}>
                <div className="flex-row d-flex justify-content-Between">
                    <img src={avatar_url} className="rounded-circle img-thumbnail mr-4" width="70" alt={avatar_url}/> 
                    <div className="flex-column d-flex">
                        <div className="d-flex w-100 justify-content-between flex-column align-items-start">
                        <h5 className="mb-1">{login}</h5>
                        </div>
                        <small>{html_url}</small>
                    </div>
                </div>
            </Link>
        </div>
    ))
}

export default UserItem;

