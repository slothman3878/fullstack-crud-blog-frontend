import React from 'react';
import { Route, Switch, } from "react-router-dom";
import { 
  useQuery,
} from '@apollo/client';

import { ME } from './graphql/queries/user.query';
import {useAppDispatch} from './hooks';
import ProtectedRoute from './ProtectedRoute';
import NotFound from './components/pages/NotFound';
import Home from './components/pages/Home';
import Admin from './components/pages/Admin';
import Post from './components/pages/Post';
import Write from './components/pages/Write';
import Draft from './components/pages/Draft';
import PaginatedDrafts from './components/pages/Drafts';
import PaginatedPosts from './components/pages/Posts';
import EditPost from './components/pages/EditPost';

const Router=()=>{
  const dispatch = useAppDispatch();

  useQuery( ME, { 
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

  return(
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/auth" component={()=>{window.location.href='http://localhost:5000/auth/google'; return null}}/>
      <Route path="/posts/:typeName/:page?/" component={PaginatedPosts}/>
      <Route path="/post/:slug" component={Post}/>
      <ProtectedRoute path="/draft/:id" component={Draft}/>
      <ProtectedRoute path="/drafts/:page?/" component={PaginatedDrafts}/>
      <ProtectedRoute path="/edit/:id" component={EditPost}/>
      <ProtectedRoute exact path="/admin" component={Admin}/>
      <ProtectedRoute exact path="/write" component={Write}/>
      <Route component={NotFound}/>
    </Switch>
  )
}

export default Router;