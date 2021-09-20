import {
  Fragment,
  useState,
} from 'react';
import "bootstrap/dist/css/bootstrap.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import {useAppDispatch} from './hooks';
import {BACKEND_URL} from './common/constants';
import Router from './Router';

const App=()=>{
  const dispatch = useAppDispatch();

  const [httpLink,] = useState(createHttpLink({
    uri: `${BACKEND_URL}/graphql`,
    credentials: 'include' //'same-origin'
  }))

  const [errorLink,] = useState(
    onError(({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          if(err.extensions) {
            console.log(`code: ${err.extensions.code}`);
            switch (err.extensions.code) {
              case 'UNAUTHENTICATED': // AuthenticationError in backend
                console.log('unauthenticated');
                dispatch({
                  type: 'DELETE_CURRENT_USER',
                  payload: undefined
                });
                return forward(operation);
              case 'BAD_USER_INPUT':
                console.log('bad user input');
                window.alert(err.message);
                break;             
              case 'INTERNAL_SERVER_ERROR':
                window.alert(err.message);
                //window.location.href="http://localhost:3000";
                break;
              default:
                console.log(err.extensions.code);
                window.alert(err.message);
            }}}}
      if (networkError)
        // automatically delete user from state in case of network error
        // Need a better error handling method here
        dispatch({
          type: 'DELETE_CURRENT_USER',
          payload: undefined
        });
    }))

  const [client,] = useState(new ApolloClient({
    cache: new InMemoryCache(),
    link: errorLink.concat(httpLink),
  }))

  return (
    <Fragment>
      <ApolloProvider client={client}>
        <Router/>
      </ApolloProvider>
    </Fragment>
  );
}

export default App;