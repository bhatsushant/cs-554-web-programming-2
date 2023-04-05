import Navigation from './components/Navigation';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import MyBin from './components/MyBin';
import NewPost from './components/NewPost';
import MyPosts from './components/MyPosts';

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql"
  });
  return (
    <ApolloProvider client={client}>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='/my-bin' element={<MyBin />} />
          <Route path='/my-posts' element={<MyPosts />} />
          <Route path='/new-post' element={<NewPost />} />
        </Route>
      </Routes>
    </ApolloProvider>
  );
}

export default App;
