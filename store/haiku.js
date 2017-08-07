'use strict';
//import {vision} from '../server'

import axios from 'axios';
import {googleCortical, generateHaiku} from '../utils';
import Expo from 'expo';

const haiku = ['Pichaiku'];

const GET_LABELS = 'GET_LABELS'
const GET_HAIKU = 'GET_HAIKU'

const getLabels = labels => ({type: GET_LABELS, labels});
const getHaiku = haiku => ({type: GET_HAIKU, haiku});

// Performs label detection on the image file
//THUNK creators: for async side effects
export const fetchHaiku = (imageNode) =>
  dispatch =>
    Expo.takeSnapshotAsync(imageNode, {
      result: 'base64'
    })
    .then(image => googleCortical(image))
    .then(res => {
      console.log('response after googlemuse: ', res);

    })
    .catch((error) => {
      console.log(error);
    })



// Reducer
export default function (state = haiku, action) {
  switch (action.type) {
   case GET_HAIKU:
     return action.haiku;
   case GET_LABELS:
    return action.labels;
   default:
     return state;
  }
}
