import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import AlbumFeature from './features/Album';
import TodoFeature from './features/Todo';
import DetailPage from './features/Todo/pages/DetailPage';
import Header from './components/Header';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className='app'>
      <div>
        <Header/>
      </div>

      <div className=''>
      <Link to='/todos'>Todos</Link> || <Link to='/albums'>Albums</Link>
      </div>
      
      <Routes>
        <Route path='/' element={<TodoFeature/>} />
        <Route path='/todos/*' element={<TodoFeature/>} >
          <Route path=':todoId' element={<DetailPage/>}/>
        </Route>
        <Route path='/albums' element={<AlbumFeature/>}/>

        <Route path='*' element={<NotFound/>}/>
      </Routes>

      <div>
        <h1>
          footer
        </h1>
      </div>
    </div>
    
  );
}

export default App;
// https://github.com/LeVuLong96/demo_react_11
