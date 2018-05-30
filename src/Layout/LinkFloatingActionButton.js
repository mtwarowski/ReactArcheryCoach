import React from 'react';
import { Link } from 'react-router-dom';
import { database } from '../Auth/firebase.js';
import AuthService from '../Auth/AuthService';

import Delete from 'material-ui/svg-icons/action/delete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { pink500 } from 'material-ui/styles/colors';

const LinkFloatingActionButton = (props) => {
    const styles = {
      floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
      }
    }

    const url = props.url;
    return (
      <Link to={url} >
        <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
          <ContentAdd />
        </FloatingActionButton>
      </Link>
    );  
}

export default LinkFloatingActionButton;
