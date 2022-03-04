import { useState } from 'react';
import { constants } from './constants';

const { PERFECT_MATCH, PARTIAL_MATCH } = constants;

export const trackButtons = (buttons, word, matches) => {
  const clickedButtons = [],
    perfectMatchButtons = [],
    partialMatchButtons = [];
  for (let i = 0; i < word.length; i++) {
    if (parseInt(matches[i]) === PERFECT_MATCH) {
      perfectMatchButtons.push(word[i].toLocaleLowerCase());
    } else if (parseInt(matches[i]) === PARTIAL_MATCH) {
      partialMatchButtons.push(word[i].toLocaleLowerCase());
    } else {
      clickedButtons.push(word[i].toLocaleLowerCase());
    }
  }
  return {
    clickedButtons: [
      ...new Set([...buttons.clickedButtons, ...clickedButtons]),
    ],
    perfectMatchButtons: [
      ...new Set([...buttons.perfectMatchButtons, ...perfectMatchButtons]),
    ],
    partialMatchButtons: [
      ...new Set([...buttons.partialMatchButtons, ...partialMatchButtons]),
    ],
  };
};

export const useButtons = () => {
  const [buttons, setButtons] = useState({
    clickedButtons: [],
    partialMatchButtons: [],
    perfectMatchButtons: [],
  });

  const buttonTheme = [
    {
      class: 'hg-grey',
      buttons: buttons.clickedButtons.length
        ? buttons.clickedButtons.join(' ')
        : '',
    },
    {
      class: 'hg-yellow',
      buttons: buttons.partialMatchButtons.length
        ? buttons.partialMatchButtons.join(' ')
        : '',
    },
    {
      class: 'hg-green',
      buttons: buttons.perfectMatchButtons.length
        ? buttons.perfectMatchButtons.join(' ')
        : '',
    },
  ];

  return { buttons, setButtons, buttonTheme };
};
