import { useNavigate } from "react-router-dom";
import { createList } from "../services/factory";
import { useContext, useState } from "react";
import {AuthContext} from '../contexts/AuthContext'
import Spinner from "./Spinner";
import './Home.css'

export default function Home() {
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    async function onQuickAddClick() {
        setIsLoading(true);
        const listObj = await createList();
        const listId = listObj._id;
        navigate(`/lists/quick-add/${listId}`)
    }

    return (
        <div className="home-content-wrapper">
            {user && (!isLoading
                ? <button className="button quick"
                    onClick={onQuickAddClick}
                >QuickAdd</button>
                : <Spinner />)
            }

        </div>
    );
}