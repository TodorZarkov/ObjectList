import {Link} from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { getPictureFromDrive } from '../../services/googleServices';
import './ListPreview.css';
import { getObject } from '../../services/factory';
import RemoveList from './RemoveList';
import { AuthContext } from '../../contexts/AuthContext';

export default function ListPreview({
    listInfo,
}) {

    const {toggleListUpdate} = useContext(AuthContext)

    const [photos, setPhotos] = useState([]);
    useEffect(() => {
        objectIdsToPhotos(listInfo.objectIds)
        return setPhotos([]);
    },[toggleListUpdate.listUpdate])
    
    
    async function objectIdsToPhotos(objectIds) {
        objectIds
        .map(oid => getObject(oid, 'pictureIds')
        .then(info => getPictureFromDrive(info.pictureIds[0]).then(picture => setPhotos(s=>[...s, picture]))))
        
    }

    return (
        <>
            <article className="list-preview">
                <h4>
                    <Link to={`/lists/${listInfo._id}`}>{listInfo.name}</Link>
                    <RemoveList listId={listInfo._id} />
                </h4>
                <div className="list-pictures-container">
                {photos.map((p,i) => <img src={p} alt={i} />)}
                </div>
            </article>

            

        </>
    );
};