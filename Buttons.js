import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {fetchImageFromCamera, fetchImageFromAlbum, fetchHaiku} from './store';

const styles = StyleSheet.create({
  actionButtonIcon: {
    fontSize: 25,
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
    <ActionButton buttonColor="#4bbcf4" position="center">
      <ActionButton.Item buttonColor='#ffb6b9' title="New Photo" onPress={takePhoto}>
        <Icon name="camera-retro" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor='#61c0bf' title="Camera Roll" onPress={pickPhoto}>
        <Icon name="picture-o" style={styles.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor='#61c0bf' title="Pichaiku!" onPress={this.makeHaiku}>
        <Icon name="magic" style={styles.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>)
  }

  makeHaiku () {
    console.log('this.props.image from buttons: ', this.props.viewDom)
    this.props.makeHaikuFromImage(this.props.viewDom)
  }
}



/**
 * CONTAINER
 */

const mapState = (state) => {
  return {
    image: state.image,
    labels: state.labels
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
