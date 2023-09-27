import { Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import NotFound from './components/NotFound';
import ProductFeature from 'features/Product';
import CartFeature from 'features/Cart'
import ManageFeatures from 'features/Manage';

function App() {


  return (
    <div className='app'>
      <div>
        <Header/>
      </div>
      
      <Routes>
        <Route path='/' element={<ProductFeature/>} />
        <Route path='/admin/*' element={<ManageFeatures/>} />

        
        <Route path='/products/*' element={<ProductFeature/>}/>
        <Route path='/cart/*' element={<CartFeature/>}/>

        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </div>
    
  );
}

export default App;
// https://github.com/LeVuLong96/demo_react_11
