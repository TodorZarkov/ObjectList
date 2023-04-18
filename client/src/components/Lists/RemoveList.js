import { useContext } from 'react';
import './RemoveList.css'
import {AuthContext} from '../../contexts/AuthContext'
import { getList, getObject } from '../../services/factory';

export default function RemoveList({
    listId,
}) {
    const {toggleListUpdate} = useContext(AuthContext);

    async function onRemoveClick() {
        const listInfo = await getList(listId, 'objectIds');
        const pictureIds = [];
        for (const objId of listInfo.objectIds) {
            const objectInfo = await getObject(objId, '')
        }
    }


    return (
        <button className="button remove-list" onClick={onRemoveClick}>x</button>
    );
};