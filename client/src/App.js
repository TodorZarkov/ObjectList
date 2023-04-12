import './App.css';


import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import Main from './components/Main';
import { useEffect, useState } from 'react';
import {gapiLoaded, gisLoaded, authG} from './services/googleServices';


function App() {

  // useEffect(() =>{
    
  //     //gapiLoaded();
  //     // gisLoaded();
  //     // authG();
    
    
  // }, []);

  const [user, setUser] = useState(null)

  function toggle() {
    setUser((state) => state?null:{username: "Stamat"})
  }

  return (
    <>
      <Header user={user}/>

      <Aside user={user}/>

      <Main />
      <button className='button' onClick={toggle}>TOGGLE</button>
      <Footer />
    </>
  );
}

export default App;
