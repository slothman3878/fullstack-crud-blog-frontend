import React, {
  useEffect,
} from "react";
import {
  Redirect,
} from 'react-router-dom';
import {
  useMutation,
} from '@apollo/client';
import { CREATE_DRAFT } from '../../graphql/mutations/draft.mutation';

const Write=()=>{
  const [createDraft,{loading, error, data}] = useMutation(CREATE_DRAFT);

  useEffect(() => {
    const create_draft = async()=>{
      const data = await createDraft();
      console.log(data);
    }
    create_draft();
  }, [])

  if(error) return (<Redirect to='/'/>)
  if(data) return (<Redirect to={`/draft/${data.createDraft.id}`}/>)
  return null;
}

export default Write;