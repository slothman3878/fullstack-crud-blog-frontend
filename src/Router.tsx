import React, {
  useEffect,
} from 'react';
import { BrowserRouter, Route, Switch, Redirect, HashRouter, Link } from "react-router-dom";
import {
  Button,
} from 'react-bootstrap';
import { 
  useQuery,
} from '@apollo/client';

import { ME } from './graphql/queries/user.query';
import {useAppDispatch, useAppSelector} from './hooks';
const Router=()=>{
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state)=>state.auth)

  const { error, data } 
    = useQuery( ME, { 
        fetchPolicy: "network-only",
        pollInterval: 1000*60*5,
        // Runs on first query success
        onCompleted: (data)=>{
          console.log(data.me);
          dispatch({
            type: 'SET_CURRENT_USER',
            payload: data.me
          });
        },
      });

  useEffect(() => {
    console.log(auth.user);
  }, [auth])

  if(data||error)
    return(
      <BrowserRouter>
      <div>
      {auth.user&&auth.user.email&&<>auth.user.email</>}
      <Button href="https://slothmanxyz-v2.herokuapp.com/auth/google">auth</Button></div>
      </BrowserRouter>
    )
  return null;
}

export default Router;