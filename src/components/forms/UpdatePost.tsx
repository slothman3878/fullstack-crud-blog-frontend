import {useEffect, useState} from "react";
import { 
  Form,
  FormProps,
  Button,
  InputGroup,
  Col,
  Row,
} from "react-bootstrap";
import {
  useQuery,
} from '@apollo/client';

import { TYPES } from '../../graphql/queries/type.query';
import { POST_EXISTS } from '../../graphql/queries/post.query';

interface UpdatePostFormProps extends FormProps {
  body: string; setBody: any;
  title: string; setTitle: any;
  type: string; setType: any;
  slug: string; setSlug: any;
}

const UpdatePost=({body,setBody,title,setTitle,type,setType,slug,setSlug, ...formProps}: UpdatePostFormProps)=>{
  const [dupTitle, setDupTitle] = useState(false);
  const [dupSlug, setDupSlug] = useState(false);
  const [validTitle, setValidTitle] = useState(false);
  const [validSlug, setValidSlug] = useState(false);

  const [titleHover,setTitleHover] = useState(false);
  const [slugHover,setSlugHover] = useState(false);

  useEffect(() => {
    setValidTitle(!dupTitle&&title.length>0&&title.length<256);
    setValidSlug(!dupSlug&&slug.length>0&&slug.length<=20);
  }, [slug, title, dupSlug, dupTitle])

  const Types = useQuery(TYPES,{
    variables: {
      typesInput: {}
    },
  })

  useQuery(POST_EXISTS, {
    variables: {
      input: {
        title: title
      }
    },
    fetchPolicy: "network-only",
    onCompleted: (d)=>{
      if(d.post) setDupTitle(d.post.title!==title);
      else setDupTitle(false);
    },
  })

  useQuery(POST_EXISTS, {
    variables: {
      input: {
        slug: slug
      }
    },
    fetchPolicy: "network-only",
    onCompleted: (d)=>{
      if(d.post) setDupSlug(d.post.slug!==slug);
      else setDupSlug(false);
    }
  })

  return (
    <Form {...formProps}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formPostTitle" xs={8}>
          <Form.Label>Title</Form.Label>
          <InputGroup hasValidation>
            <Form.Control type="text" placeholder="Title" value={title}
              onChange={(e)=>{setTitle(e.target.value); setTitle(e.target.value)}}
              isValid={validTitle} isInvalid={!validTitle}
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
              isValid={validSlug} isInvalid={!validSlug}
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
              onChange={(e)=>{setBody(e.target.value); setBody(e.target.value)}}
              style={{ height: '300px' }}/>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" type="submit"
            disabled={!validTitle||!validSlug||type===''}>
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