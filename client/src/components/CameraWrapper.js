import React from "react";
import Camera from "react-html5-camera-photo";


function CameraWrapper({
    onPhotoClick,
    onCameraStart,
}) {
    return (
        <Camera
                onTakePhoto={(dataUri) => onPhotoClick(dataUri)  }
                idealResolution={{ width: 400, height: 650 }}
                //isMaxResolution = {true}
                isImageMirror={true}
                onCameraStart={onCameraStart}
        />
    );
};

export default React.memo(CameraWrapper);