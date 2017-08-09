import React, { Component } from 'react';
import {connect} from 'react-redux';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Buttons from './Buttons';

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  image:{
    flexGrow:1,
    justifyContent:'center',
  },
  buttons: {
   position:'absolute',
   bottom: 0,
   height:40,
   backgroundColor:'transparent',
   //justifyContent:'center',

 },
  headline: {
    fontSize: 30,
    textAlign: 'center',
    //justifyContent: 'center',
    backgroundColor: 'transparent',
    color: 'white',
    justifyContent: 'center',
    marginTop: window.height/30,
  }
});

class Main extends Component {


  render() {
    const {image, haiku} = this.props;

    console.log('image', image);
    const length = Object.keys(image).length;

    return (
      <View
        style={styles.container}
        ref={(view) => this.viewDom = view}>

          <Image source={length !== 4 ? require('./mountain.jpg') : {uri: image.uri}} style={styles.image}>
            <View >
              <Text style={styles.headline}>{haiku.length ? haiku : 'Pichaiku'}</Text>
            </View>
          </Image>

      <Buttons viewDom = {this.viewDom} style={styles.buttons}/>
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

    haiku: state.haiku.map(arr => arr.join(' ')).join(',')
  }
}


export default connect(mapState)(Main);
