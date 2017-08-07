//generates a haiku syllable structure that conforms to structArr[5, 7, 5]
//after having syllables set, select random semantic structures

//can make one API call and gets back an array that contains all these data
//filter out programmatically on our end to reduce calling time: for instance, get back an array of
export const structArr = [5,7,5];

export const selectSyllablesForRemaining = (remainingSyllables) => {
  remainingSyllables.map(num => {
    const syllables = [];
    var remain = num;
    while(remain > 1){
      var selected = Math.floor(Math.random() * remain + 1)
      syllables.push(selected);
      remain -= selected;
    }
    if (remain > 0) syllables.push(remain);
    console.log ('syllable arr: ', syllables)
    return syllables;
  })
}

//returns a random index from an arr
export const selectRandIndex = (arr) =>
  Math.floor(Math.random() * arr.length)

//['adj', 'adv', 'n', 'v']
export const typeArr = ['adj', 'adv', 'n', 'v']
//returns the type of word the haiku would start with
export const selectWordType = () => {
  const resultType = [];
  for (var i = 0; i < 3; i++){
    resultType.push(typeArr[Math.floor(Math.random()*4)])
  }
  return resultType;
}

//given an array of words with defs specifying types, return an array of arrays of given types
export const sortedWordsWithType = (wordsArr) =>
  typeArr.map(type =>
    wordsArr.filter(wordObj =>
      wordObj.defs && (wordObj.defs.some(def => {
        var r = def.split('\t')
        var result = ( r[0] === type)
        return result
      })))
    )
//given a word array and an array of syllables, return a array of words grouped by syllables
//syllablesArr = [2,1]
export const sortedWordsWithSyllables = (wordsArr, syllablesArr) =>
  syllablesArr.map(syllable =>
    wordsArr.filter(word => word.numSyllables === syllable)
  )

export default function generateHaiku (labels) {
  console.log('Im making a haiku');
  return labels;
}
