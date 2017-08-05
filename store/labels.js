'use strict';
//import {vision} from '../server'
import GOOGLE_API from '../secrets';
import axios from 'axios';
import {makeHaiku} from '../utils';

const haiku = [];

const GET_LABELS = 'GET_LABELS'
const GET_HAIKU = 'GET_HAIKU'

const getLabels = labels => ({type: GET_LABELS, labels});
const getHaiku = haiku => ({type: GET_HAIKU, haiku});

// get labels returned by google cloud API
// const getImageLabels = (imageData) =>
//   fetch('https://vision.googleapis.com/v1/images:annotate', {
//     method: 'POST',
//     body: {
//       "requests":[
//       {
//         "image":{
//           "content": imageData
//         },
//         "features":[
//           {
//             "type":"LABEL_DETECTION",
//             "maxResults":5
//           }
//         ]
//       }
//     ]
//   }
// })

// Performs label detection on the image file
//THUNK creators: for async side effects

export const fetchLabels = (imageData) =>
  dispatch => {
    //formulate the request
    const image = {
      "requests":[
        {
          "image":{
            "content": imageData
          },
          "features":[
            {
              "type":"LABEL_DETECTION",
              "maxResults":5
            }
          ]
        }
      ]
    }
    axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${GOOGLE_API}`)
    .then(res => {
      const labels = res.responses[0].labelAnnotations.map(annotation =>
        annotation.description);
      console.log('Labels:', labels);
      dispatch(getLabels(labels));
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
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
