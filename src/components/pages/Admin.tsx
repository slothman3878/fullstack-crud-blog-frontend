import React from "react";
import { 
  Container,
  Row,
} from 'react-bootstrap';
import {
  Link,
  Redirect,
} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import Navi from '../NavigationBar';
import CreateType from '../forms/CreateType';

const Admin = ()=>{
  return<>
    <Navi/>
    <Container style = {{marginTop: "50px"}}>
      <div className="title">
        <h1>Admin Control Panel</h1>
      </div>
      <Row md={2} style={{marginTop: "50px"}}>
        <CreateType/>
      </Row>
    </Container>
  </>
}

export default Admin;