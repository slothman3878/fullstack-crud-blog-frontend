import { 
  Container, 
} from "react-bootstrap";

import Navi from '../NavigationBar';

const Home=()=>{
  return (
    <div className="base">
      <Navi/>
      <Container style = {{marginTop: "50px"}}>
        <div className="title">
          <h1>Crud Blog</h1>
        </div>
      </Container>
    </div>
  );
}

export default Home;
