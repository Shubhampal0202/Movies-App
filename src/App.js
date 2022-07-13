
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Banner from './Components/Banner/Banner';
import Movie from './Components/Movie/Movie';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import Favourite from './Components/Favourite/Favourite';
function App() {
  return (
    <>
        <Navbar />
      <Switch>
        <Route path="/"  exact  render={
          (props)=>(
            <>
             <Banner  {...props}/>   {/*  now we can pass props */}
             <Movie {...props} />
            </>
          )
        }/>
        <Route path="/favourites" component={Favourite}  />
      </Switch>
    
    </>
  )
}
export default App;







