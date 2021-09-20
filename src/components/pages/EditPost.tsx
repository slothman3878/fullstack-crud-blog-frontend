import React, {
  useState,
} from "react";
import { 
  Container,
  Col,
  Row,
  Button,
} from 'react-bootstrap';
import {
  Redirect,
  useParams,
} from 'react-router-dom'
import {
  useQuery
} from '@apollo/client';
import {useAppDispatch, useAppSelector} from '../../hooks';
import Navi from '../NavigationBar';
import NotFound from './NotFound';
import UpdatePost from '../forms/UpdatePost';
import PostRender from '../PostRender';
import {POST} from '../../graphql/queries/post.query';

const Edit=()=>{
  const {id} = useParams<{id: string}>();
  const auth = useAppSelector((state)=>state.auth);

  const [preview, setPreview] = useState(false);
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');

  const Post = useQuery(POST, {
    variables: {
      input: {
        id: id
      }
    },
    onCompleted: (d: {post: any})=>{
      if(d.post) {
        setBody(d.post.body); setTitle(d.post.title);
      }
    }
  })

  if(auth.loading||Post.loading) return null;
  if(Post.error) return(<NotFound/>)
  if((Post.data&&Post.data.post.writer.id!==auth.user.id)||
    !auth.user) return(<Redirect to="/"/>);    
  return(
    <div>
      <Navi/>
      <Container style = {{marginTop: "50px"}}>
        <Row>
          <div className="title">
            <h1>Edit {title}</h1>
          </div>
          <Col>
            <Button style={{float: "right"}} variant="outline-primary"
              onClick={()=>{setPreview(!preview);}}>
              Preview
            </Button>
          </Col>
        </Row>
        <Row xs={1} md={preview?2:1}>
          <Col className="mb-3">
            {Post.data&& 
              <UpdatePost 
                body={Post.data.post.body} 
                setBody={setBody} 
                title={Post.data.post.title} 
                setTitle={setTitle}
                slug={Post.data.post.slug}
                type={Post.data.post.type.id}/>}
          </Col>
          {preview && <Col className="ml-3">
            <PostRender body={body} title={title}/>
          </Col>}
        </Row>
      </Container>
    </div>
  )
}

export default Edit;