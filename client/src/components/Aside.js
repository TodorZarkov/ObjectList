import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Aside({  }) {

    const user = useContext(AuthContext);

    return (
        <aside>
            {user &&
                <article className="aside-collection user" >
                    <h4>My Collections</h4>
                    <nav>
                        <ul role='list'>
                            <li>User Collection</li>
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