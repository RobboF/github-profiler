import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import Container from 'react-bootstrap/Container'

function SearchBar(props) {
  return (
    <Container className='p-5'>

        <InputGroup className="mb-3" >
            <FormControl
            placeholder="GitHub username"
            aria-label="GitHub username"
            aria-describedby="basic-addon2"
            onChange={(e)=>{props.userSearch(e.target.value)}}
            />
        </InputGroup>
    </Container>
  );
}

export default SearchBar;