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
  useHistory,
  useParams,
  Redirect,
} from 'react-router-dom'
import {
  useQuery, useMutation, 
} from '@apollo/client';
import { UPDATE_POST } from '../../graphql/mutations/post.mutation';
import {useAppSelector} from '../../hooks';
import Navi from '../NavigationBar';
import NotFound from './NotFound';
import UpdatePost from '../forms/UpdatePost';
import PostRender from '../PostRender';
import {POST} from '../../graphql/queries/post.query';
import {Post, Post_post} from '../../graphql/queries/__generated__/Post';

const Edit=()=>{
  const history = useHistory();
  const {id} = useParams<{id: string}>();
  const auth = useAppSelector((state)=>state.auth);

  const [updatePost,] = useMutation(UPDATE_POST);

  const [preview, setPreview] = useState(false);
  const [post, setPost] = useState<Post_post|null>();
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [slug, setSlug] = useState('');
  const [writer, setWriter] = useState('');

  const {error, loading} = useQuery(POST, {
    variables: {
      input: {
        id: id
      }
    },
    onCompleted: (d: Post)=>{
      if(d.post) {
        setPost(d.post);
        setBody(d.post.body); 
        setTitle(d.post.title);
        setSlug(d.post.slug);
        setType(d.post.type.id);
        setWriter(d.post.writer.id);
      }
    }
  })

  const handleSubmit = async(e: React.SyntheticEvent)=>{
    e.preventDefault();
    try{
      console.log(type);
      await updatePost({
        variables: {
          id,
          input: { title, type, body, slug, }
        }
      });
      window.alert("Success!!!");
      history.push(`/post/${slug}`);
    } catch(err: any) { 
      if(err.message==='Argument Validation Error') {
        window.alert('Please Provide Valid Arguments')
      }
    }
  }

  if(loading) return null;
  if(error) return(<NotFound/>)
  if(writer&&writer!==auth.user.id) return(
    // Should be an unauthorized page instead...
    <Redirect to="/"/>
  );
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
            <UpdatePost onSubmit={handleSubmit}
              body={body} setBody={setBody} 
              title={title} setTitle={setTitle} 
              type={type} setType={setType}
              slug={slug} setSlug={setSlug}/>
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