import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './component/Home';
import Navbar from './component/Navbar';
import Product from './component/Product';


function App() {
  return (
    <div className='App' style={{backgroundColor:'#EBEBEB'}}>
    <Navbar />
    <Routes>
            <Route path='/' element={<Home />}/>
            <Route path="/:cat/:subcat" element={<Product/>}/>
    </Routes>
    </div>
  );
}

export default App;
