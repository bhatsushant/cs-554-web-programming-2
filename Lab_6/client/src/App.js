import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Routes, Route } from "react-router-dom";
import Home from './components/Home';
import CardList from './components/CardList';
import SingleCard from './components/SingleCard';
import Navigation from './components/Navigation';
import Trainer from './components/Trainer';

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
          <Route path='/pokemon/page/:pagenum' element={<CardList />} />
          <Route path='/pokemon/:id' element={<SingleCard />} />
          <Route path='/trainers' element={<Trainer />} />
        </Route>
      </Routes>
    </ApolloProvider>
  );
}

export default App;
