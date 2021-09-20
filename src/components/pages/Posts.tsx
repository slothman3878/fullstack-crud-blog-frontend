import {
  useEffect,
  useState,
} from "react";
import { 
  Container, 
  Button,
  Row,
  Col,
} from "react-bootstrap";
import {
  Redirect,
  useParams,
  useHistory,
  Link,
} from 'react-router-dom';
import {
  useQuery
} from '@apollo/client';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {POSTS} from '../../graphql/queries/post.query';
import {Posts_posts} from '../../graphql/queries/__generated__/Posts';
import {TYPE} from '../../graphql/queries/type.query';
import {Type, Type_type} from '../../graphql/queries/__generated__/Type';
import Navi from '../NavigationBar';
import NotFound from './NotFound';

const PaginatedPosts=()=>{
  const auth = useAppSelector((state)=>state.auth)

  const {typeName} = useParams<{typeName: string}>()
  const {page} = useParams<{page: string}>();

  console.log(Number(page));

  const [type, setType] = useState('');

  const Type = useQuery(TYPE, {
    variables: {
      typeInput: {
        name: typeName,
      }
    },
    onCompleted: (data: Type)=>{
      if(data.type) setType(data.type.id);
    }
  })

  const {loading, data} = useQuery(POSTS, {
    variables: {
      input: {
        type
      },
      offset: (Number(page)?0:(Number(page)-1))*10,
    },
  })

  if(Type.data&&data)
    return(<>
      <Navi/>
      <Container style = {{marginTop: "50px"}}>
      <div className="title">
        <h1>Posts</h1>
      </div> 
      {data.posts.map((post: Posts_posts)=>
        <Container key={post.id} style={{margin: '20px'}}>
          <Link to={`/post/${post.slug}`}><h2>{post.title}</h2></Link>
        </Container>
      )}
      </Container>
    </>)
  return null;
}

export default PaginatedPosts;