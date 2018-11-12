import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ZoomIn from 'material-ui/svg-icons/action/zoom-in';
import ZoomOut from 'material-ui/svg-icons/action/zoom-out';
import ContentSave from 'material-ui/svg-icons/content/save';

const scaleStageFactor = 0.1;
const twiceScaleStageFactor = scaleStageFactor * 2;
const styles = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
}

const floatingActionButtonStyles = {
    marginTop: 2,
}


const TargetFaceControlBar = ({ scaleStage, handleAddNewArrowPoint, scale, handleSaveButtonPress, showSaveButton }) => {
    return (
        <div style={styles}>
            {showSaveButton ? 
                <div style={floatingActionButtonStyles}>
                    <FloatingActionButton secondary={true} onClick={handleSaveButtonPress}>
                        <ContentSave />
                    </FloatingActionButton>
                </div>
                : 
                <div style={floatingActionButtonStyles}>
                    <FloatingActionButton secondary={true} onClick={handleAddNewArrowPoint}>
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            }
            <div style={floatingActionButtonStyles}>
                <FloatingActionButton onClick={() => scaleStage(scaleStageFactor)}>
                    <ZoomIn />
                </FloatingActionButton>
            </div>
            <div style={floatingActionButtonStyles}>
                <FloatingActionButton disabled={scale.x < twiceScaleStageFactor || scale.y < twiceScaleStageFactor} onClick={() => scaleStage(-scaleStageFactor)}>
                    <ZoomOut />
                </FloatingActionButton>
            </div>
        </div>
    )
}

export default TargetFaceControlBar;