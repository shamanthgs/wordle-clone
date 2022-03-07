import { useState } from 'react';
import { constants } from './constants';

const { PERFECT_MATCH, PARTIAL_MATCH, NO_MATCH } = constants;

export const validateWord = (word, currentWord) => {
  return Array.from(currentWord)
    .map((letter, index) => {
      if (word[index] === letter) {
        return PERFECT_MATCH;
      }
      if (word.includes(letter)) {
        return PARTIAL_MATCH;
      }
      return NO_MATCH;
    })
    .join('');
};

export const useWords = ({ maxNumberOfAttempts }) => {
  const [words, setWords] = useState(
    [...Array.from({ length: maxNumberOfAttempts })].map(() => '')
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [isGameWon, setIsGameWon] = useState(false);

  return {
    words,
    setWords,
    isGameOver,
    isGameWon,
    setIsGameOver,
    setIsGameWon,
  };
};
