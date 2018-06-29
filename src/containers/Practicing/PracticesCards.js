import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { deletePracticeByIdAsync } from '../../actions/practices'

import { getTimeTextFromTimeSpam } from '../../helpers/datetime'

import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton/IconButton';
import Delete from 'material-ui/svg-icons/action/delete';
import Avatar from 'material-ui/Avatar/Avatar';

const styles = {
  cardContainer: {
    marginTop: 10,
    marginLeft: 2,
    marginRight: 2,
  },      
  card: {
    margin: 5,
  }
}

const PracticesCards = ({practices, deletePracticeByIdAsync}) => {
    return (
      <div style={styles.cardContainer} className="row">
        {!practices ? <div>Unable to load practices.</div>
          : practices.map((practice, index) => (
            <div key={practice.id} className="col-xs-12 col-sm-6 col-md-3 col-lg-3">
              <Card style={styles.card}>
                <CardHeader
                  title={practice.name}
                  subtitle={practice.practiceDateTimeStamp}
                  avatar={
                    <Avatar>{practice.totalValue}</Avatar>
                  }
                />
                <CardText>
                  <div><span>{practice.name} {getTimeTextFromTimeSpam(practice.practiceDateTimeStamp)}</span></div>
                </CardText>
                <CardActions>
                  <IconButton onClick={() => deletePracticeByIdAsync(practice.id)}><Delete /></IconButton>
                </CardActions>
              </Card>
            </div>
          ))
        }
      </div>
    );  
}

const mapStateToProps = (state, props) => {
  let newProps = {
      ...props,      
      practices: state.practices.page.data
  }
  return newProps;
}

const mapDispatchToProps = dispatch => bindActionCreators({
  deletePracticeByIdAsync,
}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PracticesCards)