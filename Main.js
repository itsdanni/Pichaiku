import React, { Component } from 'react';
import {connect} from 'react-redux'
import {
  Image,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Modal
} from 'react-native';
import Buttons from './Buttons';
//import {fetchImage, fetchLabels} from './store';


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   imageContainer: {
//     flex: 1,
//     alignItems: 'stretch'
//   },
//   image: {
//     flex: 1
//   },
//   text: {
//     fontSize: 20,
//     textAlign: 'center',
//     backgroundColor: 'rgba(0,0,0,0)',
//     color: 'white'
//   }

// });
var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  image:{
    flexGrow:1,
    height:null,
    width:null,
    alignItems: 'center',
    justifyContent:'center',
  },
  backdropView: {
    height: 120,
    width: 320,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  headline: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: 'white'
  }
});

class Main extends Component {

  render() {
    const {image, haiku} = this.props;
    console.log('image', image);
    const length = Object.keys(image).length;
    console.log('imagekeysL', length)
    return (
      <View
        style={styles.container}
        ref={(view) => this.viewDom = view}>

          <Image source={length !== 4 ? require('./seamountain.jpg') : {uri: image.uri}} style={styles.image}>
            <View >
              <Text style={styles.headline}>{haiku.length ? haiku.join(' ') : 'Pichaiku'}</Text>
            </View>
          </Image>

      <Buttons viewDom = {this.viewDom}/>
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
    haiku: state.haiku //[]
  }
}


export default connect(mapState)(Main);
