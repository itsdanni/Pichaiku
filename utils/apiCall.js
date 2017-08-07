//react native cannot use node in front end!!!
import axios from 'axios';
import {selectWordType, sortedWordsWithType, selectSyllablesFromRemaining, sortedWordsWithSyllables, selectRandIndex, typeArr, structArr} from './generateHaiku'

// const retinaSDK = require ('../RetinaSDK/dist/retina-sdk-1.0')

// const fullClient = retinaSDK.FullClient('665f3560-7abe-11e7-b22d-93a4ae922ff1');

// const corticalRequest = (descriptions) => {
//   return descriptions.map(description => {
//     return { "term": description}
//   })
// }
//get similar words
//['adj', 'adv', 'n', 'v']


const dataMuseApi = (descriptions) => {
  var rand = descriptions[selectRandIndex(descriptions)]
  console.log('el selected: ', rand)
  var wordTypes = selectWordType(); //['v', 'adj', 'n']
  var startingWordsArr;
  //first we get all words associated with that word
  axios.get(`https://api.datamuse.com/words?trg=${rand}&max=20&md=sd`)
  .then(wordsArr => {
  //then we get an array of sorted words according to their types
    var sortedWordsArr = sortedWordsWithType(wordsArr)
    startingWordsArr = wordTypes.map(type => {
      var index = typeArr.indexOf(type)
      var length = sortedWordsArr[index].length
      structArr.map(num => {
        var randWord = sortedWordsArr[index][selectRandIndex(length)]
        while (randWord.length > num){
          randWord = sortedWordsArr[index][selectRandIndex(length)]
        }
      console.log('starting words: ', randWord)
      return randWord;
    })
    var syllablesArr = startingWordsArr.map(word => word.numSyllables)
    var remainingSyllables = syllablesArr.map((syllable, i) => structArr[i] - syllable)
    var remainingStruct = selectSyllablesFromRemaining(remainingSyllables); //[[2,1],[2,3],[3,2]]
    return Promise.all[startingWordsArr.map(
      (start, i) =>
        axios.get(`https://api.datamuse.com/words?trg=${start}&max=20&md=sd`)
        .then(relatedWords => {
          //sort related words according to their syllables
          var sortedWords = sortedWordsWithSyllables(relatedWords, remainingStruct[i])
          var arrOfRemainingWords = sortedWords.map(words =>
            words[selectRandIndex(words)])
          var haikuLine = arrOfRemainingWords.splice(0, 0, start)
          console.log('haikuLine: ', haikuLine);
          return haikuLine;
        })
      )]
    })
  })
}

export const googleMuse = (image) =>
  axios.post('https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDXjzVKqvONaoIGdnPlgOtAkqvEWDFwoEU', {
      requests: [
        {
          image: {
            content: image

          },
          features: [
            {
              type: 'LABEL_DETECTION',
              maxResults: 5
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
  .then(descriptions =>
    dataMuseApi(descriptions));



// const corticalPromise =
//   (descriptions) =>
//     new Promise(function(resolve, reject) {
//       fullClient.getSimilarTermsForExpressions({
//         'expressions': corticalRequest(descriptions),
//         'max_results': 5,
//         'get_fingerprint': false
//       }, function(res, err){
//         if (res) resolve(res);
//         else reject(err);
//       })
//     })


