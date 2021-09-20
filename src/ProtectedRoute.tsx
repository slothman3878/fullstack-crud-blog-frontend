import React from 'react';
import { Route, Redirect, RouteProps } from "react-router-dom";
import {useAppSelector} from './hooks';

const ProtectedRoute=({...routeProps}: RouteProps)=>{
  const auth = useAppSelector((state)=>state.auth);
  
  if(auth.loading) return null;
  if(auth.user) return <Route {...routeProps} />;
  return <Redirect to="/" />;
};

export default ProtectedRoute;