import { Routes, Route } from 'react-router-dom'

import Home from './Home';
import CategoryList from './CategoryList';
import ObjectList from './ObjectList';
import Proposals from './Proposals';

export default function Main() {
    return (
        <main>
            <Routes>
                <Route path='*' element={<h2>Page Not Found</h2>} />
                <Route path='/' element={<Home />} />
                <Route path='/categories' element={<CategoryList />} />
                <Route path='/objects' element={<ObjectList />} />
                <Route path='/proposals' element={<Proposals />} />
            </Routes>
        </main>
    );
};