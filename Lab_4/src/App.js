import Characters from './components/Characters';
import Comics from './components/Comics';
import Series from './components/Series';
import Home from './components/Home';
import NavBar from './components/NavBar';
import SingleChar from './components/SingleChar';
import SingleComic from './components/SingleComic';
import SingleSeries from './components/SingleSeries';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/characters/page/:page' element={<Characters />} />
        <Route exact path='/comics/page/:page' element={<Comics />} />
        <Route exact path='/series/page/:page' element={<Series />} />
        <Route exact path='/characters/:id' element={<SingleChar />} />
        <Route exact path='/comics/:id' element={<SingleComic />} />
        <Route exact path='/series/:id' element={<SingleSeries />} />
      </Routes>
    </>
  );
}

export default App;
