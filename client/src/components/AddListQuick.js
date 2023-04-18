import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useContext, useEffect, useState } from 'react';

import CameraWrapper from './CameraWrapper';
import { addPictureToDrive, createFolderOnDrive } from '../services/googleServices'

import 'react-html5-camera-photo/build/css/index.css';
import "./AddListQuick.css";
import { AuthContext } from '../contexts/AuthContext';
import { createObject, deleteList, updateList } from '../services/factory';
import Spinner from './Spinner';

export default function AddListQuick() {

    useEffect(()=>{
        return () => {
            const objectIds = state.objectIds;
            if (state && objectIds.length > 0) {
                updateList(listId, { objectIds });
                toggleListUpdate.setListUpdate(state=>!state);
            }else if(state.photos.length===0){
                deleteList(listId);
            }
            resetState();
        };
        
    },[])

    const navigate = useNavigate();
    const { listId } = useParams();
    const { user, toggleListUpdate } = useContext(AuthContext)
    const [state, setState] = useState({
        photosCount: 0,
        photos: [],
        objectsCount: 0,
        objectIds: [],
    });

    const [isLoading, setIsLoading] = useState({
        init: true,
        objects: false,
        list: false,
    });


    const onTakePhotoClick = useCallback(dataUri => {
        setState(state => {
            const count = state.photos.push(dataUri);
            return { ...state, photosCount: count }
        });
    }, [])

    const onCameraStart = useCallback(() => {
        setIsLoading(s => ({ ...s, init: false }));
    }, [])

    function onRemovePhotoClick() {
        setState(state => {
            state.photos.pop();
            const count = state.photos.length;
            return { ...state, photosCount: count }
        });
    }


    async function onCreateObjectClick() {
        if (state.photos.length === 0) return;

        setIsLoading(s => ({ ...s, objects: true }));

        const pictureIds = [];
        for (const photo of state.photos) {
            const photoMeta =
                await addPictureToDrive(photo, user.appDirectoryId);
            pictureIds.push(photoMeta.id)
        }

        const objectId = await createObject(listId, { pictureIds });

        setState(state => ({
            photos: [],
            photosCount: 0,
            objectsCount: state.objectsCount + 1,
            objectIds: [...state.objectIds, objectId]
        }));

        setIsLoading(s => ({ ...s, objects: false }));
    }

    async function onCreateListClick() {
        const objectIds = state.objectIds;
        if (objectIds.length > 0) {
            await updateList(listId, { objectIds });
            toggleListUpdate.setListUpdate(state=>!state);
        }
        
        resetState();
        navigate(`/lists/${listId}`);
    }

    async function onCloseClick() {
        const objectIds = state.objectIds;
        if (objectIds.length === 0) {
            //deleteList(listId); will delete on unmount
            resetState();
            navigate('/');
            return;
        }

        onCreateListClick();
    }


    function resetState() {
        setState(null);
    }


    return (

        (!isLoading.objects
            ? <article className="quick-add-card">

                <CameraWrapper
                    onPhotoClick={onTakePhotoClick}
                    onCameraStart={onCameraStart}
                />


                {!isLoading.init ?
                    <>
                        <button className='button camera remove'
                            onClick={() => onRemovePhotoClick()}
                            disabled={false}
                        >Remove Last Photo</button>


                        <button
                            onClick={onCreateObjectClick}
                            className='button camera create'
                        >{`ADD The OBJECT With ${state.photosCount} Photos`}</button>


                        <button
                            className='button camera enough'
                            onClick={onCreateListClick}
                        >{`CREATE LIST With (${state.objectsCount} Objects So Far)`}</button>

                        <button
                            className='button camera '
                            onClick={onCloseClick}
                        >{`CLOSE`}</button>
                    </>
                    : <Spinner />}

            </article>
            : <Spinner />)

    );
};