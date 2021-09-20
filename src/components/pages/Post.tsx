import {
  useState,
} from "react";
import { 
  Container, 
  Button,
  Row,
  Col,
} from "react-bootstrap";
import {
  useParams,
  useHistory,
} from 'react-router-dom';
import {
  useQuery
} from '@apollo/client';

import {useAppSelector} from '../../hooks';
import {POST} from '../../graphql/queries/post.query';
import PostRender from '../PostRender';
import Navi from '../NavigationBar';
import NotFound from './NotFound';

const Post=()=>{
  const auth = useAppSelector((state)=>state.auth)

  const {slug} = useParams<{slug: string}>();
  const [id, setId] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  const {data, loading} = useQuery(POST, {
    variables: {
      input: {
        slug: slug
      }
    },
    onCompleted: (d: {post: any})=>{
      if(d.post) {
        setBody(d.post.body); setTitle(d.post.title); setId(d.post.id);
      }
    }
  })

  const history = useHistory();

  const routeChange=()=>{
    const path = `/edit/${id}`;
    history.push(path);
  }

  if(loading) return null;
  if(data&&data.post)
    return (
      <div className="base">
        <Navi/> 
        <Container style = {{marginTop: "50px"}}>       
          <div className="title">
            <h1>{title}</h1>
          </div>
          <hr/>
          <Row>
            <PostRender body={body}/>
          </Row>
          {auth&&auth.user&&auth.user.id===data.post.writer.id&&
          <Row style={{marginTop: "20px"}}>
            <Col>
              <Button style={{float: 'right'}} onClick={routeChange}>Edit</Button>
            </Col>
          </Row>}
        </Container>
      </div>);
  return <NotFound/>;
}

export default Post;