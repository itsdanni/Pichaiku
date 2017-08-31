'use strict';

import {ImagePicker} from 'expo';

const initialImage = {};

const GET_IMAGE = 'GET_IMAGE';

const getImage= image => ({type: GET_IMAGE, image});

//THUNK creator
export const fetchImageFromCamera = () =>
  dispatch => ImagePicker.launchCameraAsync()
    .then(image => dispatch(getImage(image)))
    .catch(((err) => {
      console.error('ERROR:', err);
    }))

export const fetchImageFromAlbum = () =>
  dispatch => ImagePicker.launchImageLibraryAsync()
    .then(image => dispatch(getImage(image)))
    .catch(((err) => {
      console.error('ERROR:', err);
    }))


// Reducer
export default function (state = initialImage, action) {
  switch (action.type) {
   case GET_IMAGE:
     return action.image;
   default:
     return state;
  }
}


