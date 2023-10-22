import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import UrunListesi from './components/UrunListesi';
import UrunDetay from './components/UrunDetay';
import Favoriler from './components/Favoriler';
import Footer from './components/Footer';
import Sepet from './components/Sepet';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element = {<UrunListesi/>}/>
        <Route path='/urundetay/:id' element = {<UrunDetay/>}/>
        <Route path='/favoriler' element = {<Favoriler/>}/>
        <Route path='/sepet' element = {<Sepet/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
