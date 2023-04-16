import {NavLink} from 'react-router-dom'

export default function Navigation({
    user,
}) {
    const navStyle = ({isActive}) => ({
        color: isActive ? 'red' : '#3e3e3e'
    })
    return (
        <nav>
            <ul role='list'>
                <li><NavLink style={navStyle} to='/'>Home</NavLink></li>

                <li><NavLink style={navStyle} to='/objects'>Objects</NavLink></li>

                <li><NavLink style={navStyle} to='/lists'>Lists</NavLink></li>

                {user &&
                <li><NavLink style={navStyle} to='/proposals'>Proposals</NavLink></li>}
            </ul>
        </nav>
    );
};