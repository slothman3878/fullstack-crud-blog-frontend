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
  useParams,
  useHistory,
} from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/client';
import { CREATE_POST } from '../../graphql/mutations/post.mutation';
import { SAVE_DRAFT } from '../../graphql/mutations/draft.mutation';
import { DRAFT } from '../../graphql/queries/draft.query';
import { Draft, Draft_draft } from '../../graphql/queries/__generated__/Draft';
import Navi from '../NavigationBar';
import NotFound from './NotFound';
import DraftForm from '../forms/DraftForm';
import PostRender from '../PostRender';

const DraftPage=()=>{
  const history = useHistory();
  //const auth = useAppSelector((state)=>state.auth);
  const {id} = useParams<{id: string}>();

  const [saveDraft,] = useMutation(SAVE_DRAFT);
  const [createPost,] = useMutation(CREATE_POST);

  const [preview, setPreview] = useState(false);
  const [draft, setDraft] = useState<Draft_draft|null>();
  const [body, setBody] = useState('');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [slug, setSlug] = useState('');

  const {error, loading} = useQuery(DRAFT, {
    variables: {
      input: {
        id
      }
    },
    onCompleted: (d: Draft)=>{
      console.log(d.draft);
      if(d.draft){
        setDraft(d.draft);
        setBody(d.draft.body);
        setTitle(d.draft.title);
        setSlug(d.draft.slug);
        if(d.draft.type) setType(d.draft.type.id);
      }
    },
  })

  const handleSubmit = async(e: React.SyntheticEvent)=>{
    e.preventDefault();
    try{
      await saveDraft({
        variables: {
          id,
          input: { title, type, body, slug, }
        }
      });
      window.alert("Success!!!");
    } catch(err: any) { 
      if(err.message==='Argument Validation Error') {
        window.alert('Please Provide Valid Arguments')
      }
    }
  }

  const publish = async(e: React.SyntheticEvent)=>{
    e.preventDefault();
    try{
      const {data} = await createPost({
        variables: {
          draft_id: id
        }
      });
      window.alert('Success!!!');
      history.push(`/post/${data.createPost.slug}`);
    } catch(err: any) {
      window.alert(err.message);
    }
  }

  if(loading) return null;
  if(error) return <NotFound/>
  return<>
    <Navi/>
    <Container style={{marginTop: "50px"}}>
      <Row md={2}>
        <div className="title">
          <h1>Edit Draft</h1>
        </div>
        <Col>
          <Button style={{float: "right", marginLeft: "5px"}} variant="outline-primary"
            onClick={()=>{setPreview(!preview);}}>
            Preview
          </Button>
          <Button style={{float: "right"}}
            onClick={publish}>
            Publish
          </Button>
        </Col>
      </Row>
      <Row xs={1} md={preview?2:1}>
        <Col className="mb-3">
          <DraftForm onSubmit={handleSubmit}
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
  </>
}

export default DraftPage;