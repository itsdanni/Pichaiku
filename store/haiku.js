'use strict';

import Expo from 'expo';
import axios from 'axios';
import {selectRandFromArr, selectSyllables, backupData} from '../utils';
var Promise = require('bluebird');

const GET_HAIKU = 'GET_HAIKU';
const GET_WORD = 'GET_WORD'
const getHaiku = haiku => ({type: GET_HAIKU, haiku});
const getWord = (word, i) => ({type: GET_WORD, word})
const haiku = [];

// Performs label detection on the image file
//THUNK creators: for async side effects
//get similar words
//['adj', 'adv', 'n', 'v']
var haikuArr = [[],[],[]]
export const fetchHaiku = (imageNode) =>
  dispatch =>
    Expo.takeSnapshotAsync(imageNode, {
      result: 'base64'
    })
    .then(image => googleApi(image))
    .then(descriptions =>
      { //selecting a random label
        var rand = selectRandFromArr(descriptions)
        rand = rand.split(' ').length > 1 ? rand.split(' ')[0] : rand

        var startingStruct = [2, 3, 2];
        var remainingStruct = [3, 4, 3];
        var syllableStruct = selectSyllables(remainingStruct);

        for (var i = 0; i < 3; i++){
          syllableStruct[i].push(startingStruct[i]);
        }

        var prevWordsArr = [rand, 'nature', 'emotion']; //words to start with

        return Promise.all(syllableStruct.map((syllableLine, lineNum) => {
          var prevWord = prevWordsArr[lineNum];
          Promise.each(syllableLine.map((syllable, wordNum) => {
            return axios.get(`https://api.datamuse.com/words?rel_trg=${prevWord}&md=sd`)
            .then(res => {
              var filteredArrFromSyllables = res.data.filter(obj => obj.numSyllables === syllable)
              var selected = filteredArrFromSyllables.length ?
              selectRandFromArr(filteredArrFromSyllables).word
              :
              selectRandFromArr(backupData.filter(word => word.numSyllables === syllable)).word;
              if (selected === prevWord)
                selected = selectRandFromArr(backupData.filter(wordObj => wordObj.numSyllables === syllable)).word
              var toDispatch = (wordNum === syllableLine.length - 1 && lineNum !== 2)?
                selected+','
                :
                selected
              prevWord = selected;
              dispatch(getWord(toDispatch));
              haikuArr[lineNum].push(prevWord);
              return prevWord;
            })
          }),
          promisedWord => prevWord = promisedWord
          )})
        )
        .then(res => {
          var haiku = haikuArr.map(arr => arr.join(' '));
          dispatch(getHaiku(haiku))
        })
        .catch(err => console.log('error from promise chain', err))
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
    return res.data.responses[0].labelAnnotations.map(
      annotation => annotation.description);
  })

// Reducer
export default function (state = haiku, action) {
  switch (action.type) {
  case GET_HAIKU:
     return action.haiku;
  case GET_WORD:
    return [...state, action.word]
   default:
     return state;
  }
}
