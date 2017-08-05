'use strict';

import {ImagePicker} from 'expo';
// Exponent.ImagePicker.launchCameraAsync(options)
// Display the system UI for taking a photo with the camera.
// Arguments
// • options (object) – A map of options:
// – allowsEditing (boolean) – Whether to show a UI to edit the image after it is picked. On
// Android the user can crop and rotate the image and on iOS simply crop it. Defaults to
// false.
// – aspect (array) – An array with two entries [x, y] specifying the aspect ratio to maintain
// if the user is allowed to edit the image (by passing allowsEditing: true).
// This is only applicable on Android, since on iOS the crop rectangle is always a square.
// Returns
// If the user cancelled taking a photo, returns { cancelled: true }.
// Otherwise, returns { cancelled: false, uri, width, height } where uri is
// a URI to the local image file (useable in a React Native Image tag) and width, height
// specify the dimensions of the image.

const initialImage = {};

const GET_IMAGE = 'GET_IMAGE';

const getImage= image => ({type: GET_IMAGE, image});

//THUNK creator
export const fetchImage = () =>
  dispatch => ImagePicker.launchCameraAsync()
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


