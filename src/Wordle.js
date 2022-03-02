import { useState, useCallback, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Attempt } from './Attempt';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { constants } from './constants';

const defaultLayout = [
  'q w e r t y u i o p',
  'a s d f g h j k l',
  '{enter} z x c v b n m {bksp}',
];
const keyboardLayout = {
  default: defaultLayout,
};
const { PERFECT_MATCH, PARTIAL_MATCH, NO_MATCH } = constants;
const validateWord = (word, testWord) => {
  return Array.from(testWord)
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

export const BasicTable = ({ correctWord }) => {
  const numberOfLetters = correctWord.length;
  const numberOfRows = numberOfLetters + 1,
    maxNumberOfAttempts = numberOfLetters + 1;
  const numberOfColumns = numberOfLetters + 1;

  const keyboard = useRef();
  const [attempts, setAttempts] = useState(0);
  const [words, setWords] = useState(
    [...Array.from({ length: maxNumberOfAttempts })].map(() => '')
  );
  const [matches, setMatches] = useState(
    [...Array.from({ length: maxNumberOfAttempts })].map(() => '')
  );
  // const allowMoreKeys = words[attempts].length < numberOfLetters;

  const handleSubmit = useCallback(() => {
    const matches = validateWord(correctWord, words[attempts]);
    setMatches((currMatches) =>
      currMatches.map((match, index) => (index === attempts ? matches : match))
    );
  }, [setMatches, words, correctWord, attempts]);

  const onChange = (input) => {
    console.log('Input changed', input);
    if ((input || '').length <= numberOfLetters) {
      setWords((currWords) =>
        currWords.map((word, index) =>
          index === attempts ? input.toLocaleUpperCase() : word
        )
      );
    }
  };

  const onKeyPress = (button) => {
    console.log('Button pressed', button);
    if (button === '{enter}') {
      handleSubmit();
      setAttempts((currAttempts) => currAttempts + 1);
      keyboard.current.clearInput();
    }
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow key="header">
              <TableCell colSpan={numberOfColumns} sx={{ textAlign: 'center' }}>
                Wordle
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array.from({ length: numberOfRows }).keys()].map(
              (attemptIndex) => (
                <Attempt
                  key={'attempt' + attemptIndex}
                  correctWord={correctWord}
                  word={words[attemptIndex]}
                  matches={matches[attemptIndex]}
                  attempt={attemptIndex}
                  numberOfLetters={numberOfLetters}
                />
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div style={{ width: '35%' }}>
          <Keyboard
            keyboardRef={(r) => (keyboard.current = r)}
            layout={keyboardLayout}
            onChange={onChange}
            onKeyPress={onKeyPress}
            physicalKeyboardHighlight
            physicalKeyboardHighlightPress
            maxLength={numberOfLetters}
          />
        </div>
      </div>
    </>
  );
};

export const Wordle = () => {
  const correctWord = 'HELLO';
  return (
    <div>
      <BasicTable correctWord={correctWord} />
    </div>
  );
};
