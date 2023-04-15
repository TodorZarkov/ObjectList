import {Link} from 'react-router-dom'

export default function Navigation({
    user,
}) {
    return (
        <nav>
            <ul role='list'>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/objects'>Objects</Link></li>
                <li><Link to='/lists'>Lists</Link></li>
                {user &&
                <li><Link to='/proposals'>Proposals</Link></li>}
            </ul>
        </nav>
    );
};