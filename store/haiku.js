'use strict';
//import {vision} from '../server'

import axios from 'axios';
import base64 from 'base-64';
import utf8 from 'utf8';
import {makeHaiku} from '../utils';
import Expo from 'expo';

const haiku = ['Pichaiku'];

const GET_LABELS = 'GET_LABELS'
const GET_HAIKU = 'GET_HAIKU'

const getLabels = labels => ({type: GET_LABELS, labels});
const getHaiku = haiku => ({type: GET_HAIKU, haiku});

// Performs label detection on the image file
//THUNK creators: for async side effects
export const fetchHaiku = (imageNode) =>
  (dispatch) => {
    Expo.takeSnapshotAsync(imageNode, {
      result: 'base64'
    })
    .then(image =>
    axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDXjzVKqvONaoIGdnPlgOtAkqvEWDFwoEU', {
      requests: [
        {
          image: {
            content: image

          },
          features: [
            {
              type: 'LABEL_DETECTION',
              maxResults: 10
            }
          ]
        }
      ]
    }))
  // when response status code is 200
  .then(res => {
    const descriptions = res.data.responses[0].labelAnnotations.map(
      annotation => annotation.description);
    console.log(descriptions);
    dispatch(getHaiku(descriptions));
    //descriptions is an array of labels
  })
  .catch((error) => {
    console.log(error);
  })
  }


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
