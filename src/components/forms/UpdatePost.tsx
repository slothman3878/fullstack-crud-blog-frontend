import React, {useState} from "react";
import { 
  Form,
  Button,
  ButtonGroup,
  InputGroup,
  Col,
  Row,
} from "react-bootstrap";
import {
  Redirect,
  Route,
  Link,
  useParams,
} from 'react-router-dom'
import {
  useMutation,
  useQuery,
} from '@apollo/client';

import { TYPES } from '../../graphql/queries/type.query';
import { POST_EXISTS } from '../../graphql/queries/post.query';
import { UPDATE_POST } from '../../graphql/mutations/post.mutation';

const UpdatePost=(props: {
  setBody: any, 
  body: string,
  setTitle: any, 
  title: string,
  slug: string,
  type: string,
})=>{
  const {id} = useParams<{id: string}>();

  const [updatePost, {loading}] = useMutation(UPDATE_POST);
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  const [slug, setSlug] = useState(props.slug);
  const [dupTitle, setDupTitle] = useState(false);
  const [dupSlug, setDupSlug] = useState(false);
  const [type, setType] = useState(props.type);

  const [titleHover,setTitleHover] = useState(false);
  const [slugHover,setSlugHover] = useState(false);

  const Types = useQuery(TYPES,{
    variables: {
      typesInput: {}
    },
  })

  const TitleExists = useQuery(POST_EXISTS, {
    variables: {
      input: {
        title: title
      }
    },
    fetchPolicy: "network-only",
    onCompleted: (d)=>{
      if(d.post) setDupTitle(d.post.title!==props.title);
      else setDupTitle(false);
    },
  })

  const SlugExists = useQuery(POST_EXISTS, {
    variables: {
      input: {
        slug: slug
      }
    },
    fetchPolicy: "network-only",
    onCompleted: (d)=>{
      if(d.post) setDupSlug(d.post.slug!==props.slug);
      else setDupSlug(false);
    }
  })

  const handleSubmit = async(e: React.SyntheticEvent)=>{
    e.preventDefault();
    try{
      const data = await updatePost({
        variables: {
          id: id,
          input: {
            title: title,
            type: type,
            body: body,
            slug: slug,
          }
        }
      });
      // Something indicating success...
      //setBody(''); setSlug(''); setTitle('');
      window.alert("Success!!!")
    } catch(err: any) { 
      if(err.message==='Argument Validation Error') {
        window.alert('Please Provide Valid Arguments')
      }
    }
    Types.refetch();
  }

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formPostTitle" xs={8}>
          <Form.Label>Title</Form.Label>
          <InputGroup hasValidation>
            <Form.Control type="text" placeholder="Title" value={title}
              onChange={(e)=>{setTitle(e.target.value); props.setTitle(e.target.value)}}
              isValid={!dupTitle&&title.length>0&&title.length<256}
              isInvalid={dupTitle||title.length===0||title.length>255}
              onMouseEnter={()=>{setTitleHover(true)}}
              onMouseLeave={()=>{setTitleHover(false)}}
              />
            {titleHover && <Form.Control.Feedback type="invalid" tooltip>
              {dupTitle ? <>Title already exists</>
              : <>Length should be between 1 and 255</>}
            </Form.Control.Feedback>}
          </InputGroup>
        </Form.Group>
        <Form.Group as={Col} controlId="formPostSlug">
          <Form.Label>Slug</Form.Label>
          <InputGroup hasValidation>
            <Form.Control type="text" placeholder="Slug" value={slug}
              onChange={(e)=>{setSlug(e.target.value)}}
              isValid={!dupSlug&&slug.length>0&&slug.length<=20}
              isInvalid={dupSlug||slug.length===0||slug.length>20}
              onMouseEnter={()=>{setSlugHover(true)}}
              onMouseLeave={()=>{setSlugHover(false)}}
              />
            {slugHover && <Form.Control.Feedback type="invalid" tooltip>
              {dupSlug ? <>Slug already exists</>
              : <>Length should be between 1 and 20</>}
            </Form.Control.Feedback>}
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Col>
          <Form.Group controlId="formPostBody">
            <Form.Label>Body</Form.Label>
            <Form.Control type="text" as="textarea" placeholder="Body" value={body}
              onChange={(e)=>{setBody(e.target.value); props.setBody(e.target.value)}}
              style={{ height: '300px' }}/>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" type="submit"
            disabled={dupSlug||slug.length===0||slug.length>20||
              dupTitle||title.length===0||title.length>255||
              type===''}>
            Submit
          </Button>
        </Col>
        <Col>
          <Form.Group className="mb-3" controlId="formPostType">
            <Form.Label>Post Type</Form.Label>
            <Form.Select aria-label="select-parent-type" value={type}
              isValid={type!==''}
              isInvalid={type===''}
              onChange={(e: any)=>{setType(e.target.value)}}>
              <option disabled value={""}>Choose a Type</option>
              {Types.data&&Types.data.types.map((t:{id: string, name: string})=>{
                return <option key={t.id} value={t.id}>{t.name}</option>
              })}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      <Row xs="auto">
        <Col>
        </Col>
      </Row>
    </Form>
  )
}

export default UpdatePost;