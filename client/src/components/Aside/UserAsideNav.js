import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllUserLists } from "../../services/factory";

export default function UserAsideNav({
    user,
    toggleListUpdate,
}) {
    const [state, setState] = useState([]);

    useEffect(() => {
        getAllUserLists(user._id, 'name', '_id')
            .then(lists => setState(lists));
    }, [user, toggleListUpdate.listUpdate])



    const navStyle = ({ isActive }) => ({
        color: isActive ? 'red' : '#3e3e3e'
    })

    return (
        <>
            <article className="aside-collection user" >
                <h4>My Collections</h4>
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
        </>

    );
};