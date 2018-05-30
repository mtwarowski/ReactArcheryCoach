import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';

const scaleStageFactor = 0.1;
const styles = {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
}

const TargetFaceControlBar = ({scaleStage, handleAddNewArrowPoint}) => {
    return (
        <div style={styles}>
            <FloatingActionButton mini={true} onClick={() => scaleStage(-scaleStageFactor)}>
                <ContentRemove />
            </FloatingActionButton>
            <FloatingActionButton mini={true} onClick={() => scaleStage(scaleStageFactor)}>
                <ContentAdd />
            </FloatingActionButton>
            <FloatingActionButton secondary={true} mini={true} onClick={handleAddNewArrowPoint}>
                <ContentAdd />
            </FloatingActionButton>
        </div>
)}

export default TargetFaceControlBar;