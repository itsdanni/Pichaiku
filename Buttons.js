import React, { Component } from 'react';
import { StyleSheet} from 'react-native';
//import ActionButton from 'react-native-action-button';
import ActionButton from 'react-native-circular-action-menu';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {fetchImageFromCamera, fetchImageFromAlbum, fetchHaiku} from './store';

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

class Buttons extends Component {
  constructor(props) {
    super(props);
    this.makeHaiku = this.makeHaiku.bind(this);
  }

  render () {
    const {takePhoto, pickPhoto} = this.props;
    return (
    <ActionButton buttonColor='rgba(75,188,244, 0.7)' position='center' bgColor='transparent' radiua='200' spacing='10'>
      <ActionButton.Item buttonColor='#ffb6b9' title="New Photo" onPress={takePhoto}>
        <Icon name="md-camera" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor='#61c0bf' title="Camera Roll" onPress={pickPhoto}>
        <Icon name="md-image" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor='#61c0bf' title="Pichaiku!" onPress={this.makeHaiku}>
        <Icon name="md-color-wand" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>)
  }

  makeHaiku () {
    this.props.makeHaikuFromImage(this.props.viewDom)
  }
}

/**
 * CONTAINER
 */

const mapState = (state) => {
  return {
    image: state.image,
  }
}
const mapDispatch = (dispatch) => {
  return {
    takePhoto () {
      dispatch(fetchImageFromCamera())
    },
    pickPhoto () {
      dispatch(fetchImageFromAlbum())
    },
    makeHaikuFromImage(viewNode) {
      dispatch(fetchHaiku(viewNode))
    }
  }
}

export default connect(mapState, mapDispatch)(Buttons);
