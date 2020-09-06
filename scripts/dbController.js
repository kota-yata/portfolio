/* global _myapp */
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: _myapp.env.API_KEY,
  authDomain: 'kota-yata.firebaseapp.com',
  databaseURL: 'https://kota-yata.firebaseio.com',
  projectId: 'kota-yata',
  storageBucket: 'kota-yata.appspot.com',
  messagingSenderId: _myapp.env.MESSAGING_SENDER_ID,
  appId: _myapp.env.APP_ID
};
firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();
const reaction = database.collection('reactions').doc('data');

/**
 * 高評価と低評価の数値をデータベースから取得する
 * @param {string} vote どちらの評価数を取得するのか。'upvote'か'downvote'
 */
export const getReactionNumber = async (vote) => {
  const refData = await reaction.get();
  if (!refData.exists) return null;
  if (vote !== 'upvote' && vote !== 'downvote') {
    console.error('getReactionNumber: argument must be upvote or downvote');
    return;
  }
  return refData.get(vote);
};

/**
 * データベースの数値を更新する
 * @param {string} vote どちらの評価数を更新するのか。'upvote'か'downvote'
 * @param {*} calc 数値を加算するのか減算するのか。'addition'か'subtraction'
 */
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
