import { useParams } from 'react-router-dom';
import { useCallback, useContext, useState } from 'react';

import CameraWrapper from './CameraWrapper';
import { addPictureToDrive, createFolderOnDrive } from '../services/googleServices'

import 'react-html5-camera-photo/build/css/index.css';
import "./AddObjectQuick.css";
import { AuthContext } from '../contexts/AuthContext';
import { createObject } from '../services/factory';
import Spinner from './Spinner';

export default function AddObjectQuick() {

    const { listId } = useParams();
    const { user } = useContext(AuthContext)
    const [state, setState] = useState({
        photosCount: 0,
        objectsCount: 0,
        photos: [],
        objectIds: [],
    });

    const [isLoading, setIsLoading] = useState(true);


    const onTakePhotoClick = useCallback(dataUri => {
        setState(state => {
            const count = state.photos.push(dataUri);
            return { ...state, photosCount: count }
        });
        console.log(state.photos);
        console.log('count from take: ', state.photosCount);
    }, [])

    const onCameraStart = useCallback(() => {
        setIsLoading(false);
    },[])

    function onRemovePhoto() {
        setState(state => {
            state.photos.pop();
            const count = state.photos.length;
            return { ...state, photosCount: count }
        });

        console.log('count from remove: ', state.photosCount);
    }


    async function onCreateObject() {
        setIsLoading(true);

        const pictureIds = [];
        for (const photo of state.photos) {
            const photoMeta =
                await addPictureToDrive(photo, user.appDirectoryId);
            pictureIds.push(photoMeta.id)
        }

        const objectId = await createObject(listId, { pictureIds });
        console.log(objectId);
        setState(state=>({ 
            photos: [], 
            photosCount: 0, 
            objectsCount: state.objectsCount+1,
            objectIds: [...state.objectIds, objectId]
        }));
            
        setIsLoading(false);
    }


   

    return (

        <article className="quick-add-card">

            <CameraWrapper
                onPhotoClick={onTakePhotoClick}
                onCameraStart={onCameraStart}
            />


            {!isLoading ?
            <>
                <button className='button camera remove'

                    onClick={() => onRemovePhoto()}
                    disabled={false}
                >Remove Last Photo [backspace]</button>


                <button
                    onClick={onCreateObject}
                    className='button camera create'
                >{`Add The Object With ${state.photosCount} Photos [enter]`}</button>


                <button
                    className='button camera enough'

                >{`Create List With (${state.objectsCount} Objects So Far) [esc]`}</button>
            </>
            :
            <Spinner />}

        </article>

    );
};