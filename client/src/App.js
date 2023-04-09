import './App.css';
import { Routes, Route } from 'react-router-dom'

import Header from './components/Header';
import Home from './components/Home';
import CategoryList from './components/CategoryList';
import ObjectList from './components/ObjectList';
import Proposals from './components/Proposals';


function App() {
  return (
    <>
      <Header></Header>
      
        <aside>
          <nav>
            <ul role='list'>
              <li>User navs</li>
              <li>User navs</li>
              <li>User navs</li>
              <li>User navs</li>
              <li>User navs</li>

            </ul>
          </nav>
        </aside>

        <main>
          <Routes>
            <Route path='*' element={<h2>Page Not Found</h2>} />
            <Route path='/' element={<Home />} />
            <Route path='/categories' element={<CategoryList />} />
            <Route path='/objects' element={<ObjectList />} />
            <Route path='/proposals' element={<Proposals />} />
          </Routes>
        </main>
      

      <footer>
      <p>Copyright © designed by Todor Zarkov</p>
      </footer>
    </>
  );
}

export default App;
