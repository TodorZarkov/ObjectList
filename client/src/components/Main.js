import { Routes, Route } from 'react-router-dom'

import Home from './Home';
import Lists from './Lists';
import Objects from './Objects';
import Proposals from './Proposals';

export default function Main() {
    return (
        <main>
            <Routes>
                <Route path='*' element={<h2>Page Not Found</h2>} />
                <Route path='/' element={<Home />} />
                <Route path='/lists' element={<Lists />} />
                <Route path='/objects' element={<Objects />} />
                <Route path='/proposals' element={<Proposals />} />
            </Routes>
        </main>
    );
};