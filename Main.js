import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
  Image,
  Dimensions,
  StyleSheet,
  Text,
  View
} from 'react-native';
//import Camera from 'react-native-camera';
import {fetchImage, fetchLabels} from './store';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  imageContainer: {
    flex: 1,
    alignItems: 'stretch'
  },
  image: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  }
});

class Main extends Component {

  componentDidMount () {
    this.props.loadInitialData()
  }

  render() {
    const {image} = this.props;
    console.log('image', image);
    return (
      <View style={styles.imageContainer}>
      {
        image ?
        <Image source={{uri: image.uri}} style={styles.image}/>
        :
        <h1>Pichaiku</h1>
      }
      </View>
    )
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
    loadInitialData () {
      dispatch(fetchImage());
      //dispatch(fetchLabels());
    }
  }
}

export default connect(mapState, mapDispatch)(Main);
