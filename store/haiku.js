'use strict';
//import {vision} from '../server'
//import {googleMuse} from '../utils';
import Expo from 'expo';
//react native cannot use node in front end!!!
import axios from 'axios';
import {selectRandFromArr, selectSyllables, backupData} from '../utils';

const haiku = [];

const GET_WORD = 'GET_WORD'

//const GET_LABELS = 'GET_LABELS'


//const getLabels = labels => ({type: GET_LABELS, labels});
const getWord = newWord=> ({type: GET_HAIKU, newWord});


// Performs label detection on the image file
//THUNK creators: for async side effects

//get similar words
//['adj', 'adv', 'n', 'v']
var haikuArr = [[],[],[]];
export const fetchHaiku = (imageNode) =>
  dispatch =>
    Expo.takeSnapshotAsync(imageNode, {
      result: 'base64'
    })
    .then(image => googleApi(image))
    .then(descriptions =>
{

  //selecting a random label
  var rand = selectRandFromArr(descriptions)
  rand = rand.split(' ').length > 1 ? rand.split(' ')[0] : rand
  console.log('el selected: ', rand)
  //var wordTypes = selectWordType(); //['v', 'adj', 'n']

  var startingStruct = [2, 3, 2];
  var remainingStruct = [3, 4, 3];
  var syllableStruct = selectSyllables(remainingStruct);

  for (var i = 0; i < 3; i++){
    syllableStruct[i].push(startingStruct[i]);
  }
  console.log('syllableStruct:', syllableStruct);

  var callType = ['rel_trg', 'rel_jjb', 'rel_trg'];
  var prevWordsArr = [rand, 'nature', 'emotion']; //words to start with

   //[[2,1,2],[3,2,2],[4,1]]
  return Promise.all(syllableStruct.map((lineArr, index) => {
      //[2,1,2] //the first line
      console.log('linearr: ', lineArr);
      var prevWord = prevWordsArr[index]; //rand
      console.log('firstprevWord: ', prevWord);

      return Promise.all(lineArr.map(syllable => {
        return axios.get(`https://api.datamuse.com/words?${selectRandFromArr(callType)}=${prevWord}&md=sd`)
        .then(res => {
          console.log('response from datamuse: ', res.data)
          console.log('syllable to match: ', syllable)
          prevWord = res.data.length ?
            selectRandFromArr(res.data.filter(obj => obj.numSyllables === syllable))
            :
            selectRandFromArr(backupData.filter(word => word.numSyllables === syllable))

          console.log('index', index);
          console.log('haiku', haikuArr[index]);
          dispatch(getWord(prevWord.word));
          haikuArr[index].push(prevWord.word);

          return haikuArr[index];
        })

      }));
    }))

  //promise returns a haiku
})

const googleApi = (image) =>
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
    })
  .then(res => {
    console.log('response from google: ', res.data);
    return res.data.responses[0].labelAnnotations.map(
      annotation => annotation.description);
  });

// Performs label detection on the image file
//THUNK creators: for async side effects

// Reducer
export default function (state = haiku, action) {
  switch (action.type) {
  case GET_WORD:
     return [...state, action.word];
   default:
     return state;
  }
}
