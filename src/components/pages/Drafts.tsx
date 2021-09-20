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
import {DRAFTS} from '../../graphql/queries/draft.query';
import {Drafts_drafts} from '../../graphql/queries/__generated__/Drafts';
import Navi from '../NavigationBar';
import NotFound from './NotFound';

const PaginatedDrafts=()=>{
  const auth = useAppSelector((state)=>state.auth)

  const {page} = useParams<{page: string}>();

  const {loading, data} = useQuery(DRAFTS, {
    variables: {
      input: {},
      offset: (Number(page)?0:(Number(page)-1))*10,
    }
  })

  if(data)
  return(<>
    <Navi/>
    <Container style = {{marginTop: "50px"}}>
    <div className="title">
      <h1>Drafts</h1>
    </div> 
    {data.drafts.map((draft: Drafts_drafts)=>
      <Container style={{margin: '20px'}}>
        <h3>{draft.title||'untitled'}</h3>
        <Link to={`/draft/${draft.id}`}>{draft.id}</Link>
      </Container>
    )}
    </Container>
  </>)
  return null;
}

export default PaginatedDrafts;