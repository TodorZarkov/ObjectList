import { useContext } from 'react';
import './RemoveList.css'
import {AuthContext} from '../../contexts/AuthContext'
import { deleteList, deleteObject, getList, getObject } from '../../services/factory';
import { deleteFileFromDrive } from '../../services/googleServices';

export default function RemoveList({
    listId,
}) {
    const {toggleListUpdate} = useContext(AuthContext);

    async function onRemoveClick() {
        const listInfo = await getList(listId, 'objectIds');
        console.log(listInfo);
        const pictureIds = [];
        for (const objId of listInfo.objectIds) {
            const objectInfo = await getObject(objId, 'pictureIds');
            pictureIds.push(objectInfo.pictureIds);
        };

        for (const pictureId of pictureIds) {
            await deleteFileFromDrive(pictureId);
        }
        for (const objectId of listInfo.objectIds) {
            await deleteObject(objectId);
        }
        await deleteList(listId)
        toggleListUpdate.setListUpdate(state=>!state);
    }


    return (
        <button className="button remove-list" onClick={onRemoveClick}>
            <i class="fas fa-trash-alt"></i>
        </button>
    );
};