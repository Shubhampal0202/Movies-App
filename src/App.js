import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Movies from './Components/Movies';
import Favourite from './Components/Favourite';
import { BrowserRouter as Router, Routes,Switch, Route,BrowserRouter } from 'react-router-dom';
function App() {
  return (
          
           <BrowserRouter>
              <Navbar/>
              <Routes>
           
              <Route path='/' element={ 
                <>
                <Banner/>
                <Movies/>
                </>
              }/> 

         
               <Route path='/favourite' element={<Favourite/>}/> 
              </Routes>
              
               {/* <Banner/>
               <Movies/>
               <Favourite/> */}
           </BrowserRouter>

  
          
        

  );                                      
}

export default App;
