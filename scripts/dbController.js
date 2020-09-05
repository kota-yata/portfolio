import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: 'kota-yata.firebaseapp.com',
  databaseURL: 'https://kota-yata.firebaseio.com',
  projectId: 'kota-yata',
  storageBucket: 'kota-yata.appspot.com',
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
};
firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();
const reaction = database.collection('reactions').doc('data');

export const getReactionNumber = async (vote) => {
  const refData = await reaction.get();
  if (!refData.exists) return null;
  if (vote !== 'upvote' && vote !== 'downvote') {
    console.error('getReactionNumber: argument must be upvote or downvote');
    return;
  }
  return refData.get(vote);
};

export const updateData = async (vote, calc) => {
  if (vote !== 'upvote' && vote !== 'downvote') return;
  if (calc !== 'addition' && calc !== 'subtraction') return;
  const calcNum = calc === 'addition' ? 1 : -1;
  const upvoteNum = await getReactionNumber('upvote');
  const downvoteNum = await getReactionNumber('downvote');
  if (vote === 'upvote') {
    reaction.update({
      upvote: upvoteNum + calcNum,
      downvote: downvoteNum
    });
  } else if (vote === 'downvote') {
    reaction.update({
      upvote: upvoteNum,
      downvote: downvoteNum + calcNum
    });
  }
};
