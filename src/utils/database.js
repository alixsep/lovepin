import {
  get,
  /*set, getMany, */ setMany,
  update,
  clear,
  values,
} from 'idb-keyval';

export const saveDB = (db) => {
  let safeDB = db
    .filter((word, i) => word && word?.id)
    .reduce((unique, o) => {
      if (!unique.some((obj) => obj.id === o.id)) {
        unique.push(o);
      }
      return unique;
    }, []);
  let pairs = [];
  safeDB.forEach((word) => {
    pairs.push([word.id, word]);
  });
  setMany([...pairs, ['_DB', true]])
    .then(() => {
      console.log('Saved database.');
      window.location.reload();
    })
    .catch((err) => console.log('Failed saving database.', err));
};

export const getSearchResources = async () => {
  let db = await values();
  let searchResources = [];
  db.forEach((word) => {
    if (word.id)
      searchResources.push({ id: word.id, word: word.word, pos: word.pos });
  });
  return searchResources;
};

export const verifyDB = async () => {
  let verification = await get('_DB');
  return verification;
};

export const getWord = async (id) => {
  let word = await get(id);
  return word;
};

export const updateWord = (word) => {
  update(word.id, () => word);
};

// export const getWordList = async () => {
//   let wordList = await keys();
//   return wordList;
// };

export const getLikedWords = async () => {
  let db = await values();
  let likedWords = [];
  db.forEach((word) => {
    if (word.id && word.love)
      likedWords.push({ id: word.id, word: word.word, pos: word.pos });
  });
  return likedWords;
};

export const deleteDB = () => {
  return clear();
};
