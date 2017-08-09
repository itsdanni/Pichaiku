
export const selectSyllables = (struct) => {
  return struct.map(num => {
    const syllables = [];
    var remain = num;
    while(remain > 1){
      var selected = Math.floor(Math.random() * remain + 1)
      syllables.push(selected);
      remain -= selected;
    }
    if (remain > 0) syllables.push(remain);
    return syllables;
  })
}

//returns a random element from arr
export const selectRandFromArr = (arr) =>
  arr[Math.floor(Math.random() * arr.length)]

export const generateHaiku = (wordsObjArr) => {
  var structDataFive = [[2,3],[1,2,2],[2,1,2],[3,2]];
  var structDataSeven = [[2,3,2],[3,2,2],[4,3],[3,4],[1,2,2,2],[1,4,2],[1,2,4]];
  var syllableStruct = [selectRandFromArr(structDataFive), selectRandFromArr(structDataSeven),selectRandFromArr(structDataFive)];

  console.log('syllableStruct:', syllableStruct);
  return syllableStruct.map((line, index) => {
    return line.map(syllable => {
      var filteredArrFromSyllables = wordsObjArr[index].filter(obj => obj.numSyllables === syllable)
      console.log('data with certain syllables', filteredArrFromSyllables)
      return filteredArrFromSyllables.length ?
      selectRandFromArr(filteredArrFromSyllables).word
      :
      selectRandFromArr(backupData.filter(word => word.numSyllables === syllable)).word;
    })
  })
}

export const backupData = [
  {
    word: 'night',
    numSyllables: 1
  },
  {
    word: 'moon',
    numSyllables: 1
  },
  {
    word: 'away',
    numSyllables: 2
  },
  {
    word: 'distant',
    numSyllables: 2
  },
  {
    word: 'dandelion',
    numSyllables: 3
  },
  {
    word: 'treacherous',
    numSyllables: 3
  },
  {
    word: 'beautiful',
    numSyllables: 4
  },
  {
    word: 'undulating',
    numSyllables: 4
  }
]
