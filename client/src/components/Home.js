import { useNavigate } from "react-router-dom";
import { createList } from "../services/factory";
import { useState } from "react";
import Spinner from "./Spinner";

export default function Home() {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    async function onQuickAddClick() {
        setIsLoading(true);
        const listObj = await createList();
        const listId = listObj._id;
        navigate(`/lists/quick-add/${listId}`)
    }

    return (
        <>
            {!isLoading
                ? <button className="button quick"
                    onClick={onQuickAddClick}
                >QuickAdd</button>
                : <Spinner />
            }

        </>
    );
}