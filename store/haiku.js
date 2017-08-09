'use strict';
//import {vision} from '../server'
//import {googleMuse} from '../utils';
import Expo from 'expo';
//react native cannot use node in front end!!!
import {googleApi, dataMuseApi, generateHaiku} from '../utils';

const GET_HAIKU = 'GET_HAIKU';
//const GET_WORD = 'GET_WORD'
//const GET_LABELS = 'GET_LABELS';
//const getLabels = labels => ({type: GET_LABELS, labels});
const getHaiku = haiku => ({type: GET_HAIKU, haiku});
//const getWord = (word, i) => ({type: GET_WORD, word})
//const getLabels = labels => ({type: GET_LABELS, labels});
const haiku = [];

// Performs label detection on the image file
//THUNK creators: for async side effects

//get similar words
//['adj', 'adv', 'n', 'v']

export const fetchHaiku = (imageNode) =>
  dispatch =>
    Expo.takeSnapshotAsync(imageNode, {
      result: 'base64'
    })
    .then(image => googleApi(image))
    .then(descriptions => dataMuseApi(descriptions))
    .then(arrOfWords => {
      var haikuArr = generateHaiku(arrOfWords)
      console.log('FINAL HAIKU: ', haikuArr)
      dispatch(getHaiku(haikuArr))
    })

// Reducer
export default function (state = haiku, action) {
  switch (action.type) {
  case GET_HAIKU:
     return action.haiku;

   default:
     return state;
  }
}
