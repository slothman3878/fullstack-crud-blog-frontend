import React, {useState} from "react";
import { 
  Navbar, 
  Nav, 
  NavDropdown 
} from "react-bootstrap";
import {
  Container,
  Button
} from 'react-bootstrap';
import {useAppSelector} from '../hooks';

const Navi=()=>{
  const auth = useAppSelector((state)=>state.auth);

  const [open, setOpen] = useState(false);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">Crud Blog</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#">About</Nav.Link>
            <NavDropdown
              id="basic-nav-dropdown"
              title="Type 1"
              onMouseEnter={()=>{setOpen(true)}}
              onMouseLeave={()=>{setOpen(false)}}
              show={open}>
              <NavDropdown.Item href="#action/3.1">Subtype 1</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Subtype 2</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#">Type 2</Nav.Link>    
          </Nav>
          <Nav className="justify-content-end">
            {auth.user
              && <>
                  {auth.user.isAdmin 
                    && <Nav.Link href="/admin">Admin Control</Nav.Link>}
                  {auth.user.isWriter 
                    && <>
                      <Nav.Link href="/drafts">Drafts</Nav.Link>
                      <Nav.Link href="/write">Write</Nav.Link>
                    </>}
                </>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navi;