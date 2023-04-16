import { useContext, useEffect } from "react";
import { AuthContext } from "../contexts/AuthContext";
import {NavLink } from "react-router-dom";
import { getAllLists } from "../services/factory";

export default function Aside({ }) {

    const {user} = useContext(AuthContext);

    useEffect(() => {
        getAllLists('name', '_id').then(l=>console.log(l));
    },[])


    

    const navStyle = ({isActive}) => ({
        color: isActive ? 'red' : '#3e3e3e'
    })
    return (
        <aside>
            {user &&
                <article className="aside-collection user" >
                    <h4>My Collections</h4>
                    <nav>
                        <ul role='list'>
                            <NavLink style={navStyle} to={'/lists'}>
                                <li>User Collection</li>
                            </NavLink>
                            <li>User Collection</li>
                            <li>User Collection</li>
                            <li>User Collection</li>

                        </ul>
                    </nav>
                </article>
            }

            <article className="aside-collection public" >
                <h4>All Collections</h4>
                <nav>
                    <ul role='list'>
                        <li>Public Collection</li>
                        <li>Public Collection</li>
                        <li>Public Collection</li>
                        <li>Public Collection</li>
                        <li>Public Collection</li>
                        <li>Public Collection</li>
                        <li>Public Collection</li>
                        <li>Public Collection</li>
                        <li>Public Collection</li>
                        <li>Public Collection</li>
                        <li>Public Collection</li>
                    </ul>
                </nav>
            </article>

        </aside>
    );
};