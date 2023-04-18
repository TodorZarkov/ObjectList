import { useEffect, useState } from "react";
import { getAllListsExcludeUser } from "../../services/factory";
import { NavLink } from "react-router-dom";

export default function GuestAsideNav({
    user,
    toggleListUpdate,
}) {

    const [state, setState] = useState([]);

    useEffect(() => {
        getAllListsExcludeUser(user?._id, 'name', '_id', '_ownerId')
            .then(lists=>setState(lists));
    },[user, toggleListUpdate.listUpdate])


    const navStyle = ({ isActive }) => ({
        color: isActive ? 'red' : '#3e3e3e'
    })

    return (
        <article className="aside-collection public" >
            <h4>All Collections</h4>
            <nav>
                <ul role='list'>
                    {
                        state
                            .map(list => (
                                <NavLink key={list._id} style={navStyle} to={`/lists/${list._id}`}>
                                    <li>{list.name}</li>
                                </NavLink>
                            ))
                    }
                </ul>
            </nav>
        </article>
    );
};