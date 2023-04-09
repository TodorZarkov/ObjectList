import './App.css';

import Header from './components/Header';
import Aside from './components/Aside';
import Footer from './components/Footer';
import Main from './components/Main';
import { useState } from 'react';


function App() {

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
