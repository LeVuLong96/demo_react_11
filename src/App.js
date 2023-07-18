import './App.css';
import { Routes, Route } from 'react-router-dom';
import TodoFeature from './features/Todo';

function App() {
  return (
    <div className='app'>
      abnc
      <Routes>
        <Route path='/' element={<TodoFeature/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
