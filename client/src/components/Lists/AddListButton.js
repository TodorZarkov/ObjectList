import './AddListButton.css'
import { useNavigate } from "react-router-dom";
import { createList } from "../../services/factory";

export default function AddListButton() {

    const navigate = useNavigate();

    async function onAddListClick() {
        const listObj = await createList();
        const listId = listObj._id;
        navigate(`/lists/add/${listId}`)
    }

    return (
        <div className="add-list-btn-container">
            <button className="button add-list"
                onClick={onAddListClick}
            >AddNewList</button>
        </div>
    );
};