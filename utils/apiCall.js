import axios from 'axios';
import {selectRandFromArr} from './generateHaiku';
var Promise = require('bluebird');

export const googleApi = (image) =>
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
  })

export const dataMuseApi =
  descriptions =>{
    var rand = selectRandFromArr(descriptions)
    rand = rand.split(' ').length > 1 ? rand.split(' ')[0] : rand
    console.log('el selected: ', rand)
    const prevWordsArr = [rand, 'nature', 'emotion']; //words to start with
    var dataPromises = [];
    for (var j = 0; j < 3; j++){
      dataPromises.push(axios.get(`https://api.datamuse.com/words?rel_trg=${prevWordsArr[j]}&md=sd`))
    }
    return Promise.all(dataPromises)
    .then(arrOfRes => {
      console.log('arr of data promises', arrOfRes)
      //array of data promises
      return arrOfRes.map(res => res.data)
    })
    .catch(err => console.log('error from promise chain', err))
  }
