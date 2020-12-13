import React from 'react'
import { Navbar, Button, FormControl, Form } from 'react-bootstrap';
const SearchBar = (props) => {
 
    return (
      <>
        <Navbar bg="light" expand="lg">
          <Navbar.Brand style={{color:'#a5a58d'}}>請輸入城市名稱以取得天氣預報</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Form inline>
              <FormControl
                onChange={(e)=>props.getUserInput(e.target.value)}
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                required
              />
              <small style={{color: '#bc4749', display:props.show, bottom: '0%', marginBottom: '-0.5rem', position:'absolute' }}>{props.msg}</small>
              <Button onClick={()=>props.searchHandler()} variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      </>
    );
}

export default SearchBar
