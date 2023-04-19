import AddListButton from "./AddListButton";
import ListPreview from "./ListPreview";
import {useContext, useEffect, useState} from "react"
import {AuthContext} from '../../contexts/AuthContext'
import { getAllUserLists } from "../../services/factory";
import './Lists.css'

export default function Lists() {
    const {user, toggleListUpdate} = useContext(AuthContext);

    const [listsInfo, setListsInfo] = useState([])

    useEffect(() => {
        getAllUserLists(user?._id, '_id', 'objectIds', 'name')
        .then(list=> setListsInfo(list));
    },[user, toggleListUpdate.listUpdate]);
    
    

    return (
        <div className="list-content-wrapper">
            {user &&
            <AddListButton />}
            {listsInfo.map(listInfo => <ListPreview key={listInfo._id} listInfo={listInfo} />)}
        </div>
    );
};