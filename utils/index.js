//generates a haiku syllable structure that conforms to structArr[5, 7, 5]

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
