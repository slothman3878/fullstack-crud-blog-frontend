import {
  useState,
} from "react";
import { 
  Container, 
} from "react-bootstrap";
import {
  useParams,
  Link,
} from 'react-router-dom';
import {
  useQuery
} from '@apollo/client';

import {POSTS} from '../../graphql/queries/post.query';
import {Posts_posts} from '../../graphql/queries/__generated__/Posts';
import {TYPE} from '../../graphql/queries/type.query';
import {Type} from '../../graphql/queries/__generated__/Type';
import Navi from '../NavigationBar';
import NotFound from './NotFound';

const PaginatedPosts=()=>{
  const {typeName} = useParams<{typeName: string}>()
  const {page} = useParams<{page: string}>();

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

  const {data} = useQuery(POSTS, {
    variables: {
      input: {
        type
      },
      offset: (Number(page)?0:(Number(page)-1))*10,
    },
  })

  if(Type.data&&Type.data.type&&data)
    return(<>
      <Navi/>
      <Container style = {{marginTop: "50px"}}>
      <div className="title">
        <h1>{typeName}</h1>
      </div>
      <div className="desc">
        <h3>{Type.data.type.desc}</h3>
      </div>
      {data.posts.map((post: Posts_posts)=>
        <Container key={post.id} style={{margin: '20px'}}>
          <Link to={`/post/${post.slug}`}><h2>{post.title}</h2></Link>
        </Container>
      )}
      </Container>
    </>)
  if(Type.data&&!Type.data.type)
    return <NotFound/>
  return null;
}

export default PaginatedPosts;