import React from 'react';
import {Camera} from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import "./AddObjectQuick.css";


export default function AddObjectQuick() {


    function handleTakePhoto(dataUri) {
        // Do stuff with the photo...
        console.log('takePhoto');
    }


    return (
        <article className="quick-add-card">
            <Camera 
                onTakePhoto={(dataUri) => { handleTakePhoto(dataUri); }}
                idealResolution = {{width: 200, height: 300}}
                isMaxResolution = {true}
                isImageMirror = {true}
            />
            <button className='button camera remove'>Remove Last Photo [backspace]</button>
            <button className='button camera create'>Add The Object With 5 Photos [enter]</button>
            <button className='button camera enough'>Stop (20 Objects So Far) [esc]</button>
        </article>
    );
};