import {Link} from 'react-router-dom'

export default function Navigation() {
    return (
        <nav>
            <ul role='list'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/objects'>Objects</Link></li>
                <li><Link to='/categories'>Categories</Link></li>
                <li><Link to='/proposals'>Proposals</Link></li>
            </ul>
        </nav>
    );
};