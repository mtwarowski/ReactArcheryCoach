import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

export const LoadingIndicator = (props) =>  props.isLoading ? <LinearProgress mode="indeterminate" /> : props.children
    

