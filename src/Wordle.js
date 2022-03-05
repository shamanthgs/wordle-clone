import { useState, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { Attempt } from './Attempt';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import { useWords, validateWord } from './useWords';
import { useButtons, trackButtons } from './useButtons';
import { useHandleKeyPress } from './useHandleKeyPress';
import { messages } from './messages';

const defaultLayout = [
  'q w e r t y u i o p',
  'a s d f g h j k l',
  '{enter} z x c v b n m {bksp}',
];
const keyboardLayout = {
  default: defaultLayout,
};

export const BasicTable = ({ correctWord }) => {
  const numberOfLetters = correctWord.length;
  const numberOfRows = numberOfLetters + 1,
    maxNumberOfAttempts = numberOfLetters + 1;
  const numberOfColumns = numberOfLetters + 1;

  const keyboard = useRef();
  const [attempts, setAttempts] = useState(0);
  const { words, setWords, allowMoreKeys } = useWords({
    maxNumberOfAttempts,
    attempts,
    numberOfLetters,
  });
  const { buttonTheme, setButtons } = useButtons();
  const [showMessage, setShowMessage] = useState(false);

  const [matches, setMatches] = useState(
    [...Array.from({ length: maxNumberOfAttempts })].map(() => '')
  );
  const isGameOver = attempts === maxNumberOfAttempts - 1;
  const isGameWon = words[attempts] === correctWord;

  const handleSubmit = () => {
    const matches = validateWord(correctWord, words[attempts]);
    setMatches((currMatches) =>
      currMatches.map((match, index) => (index === attempts ? matches : match))
    );
    setButtons((buttons) => trackButtons(buttons, words[attempts], matches));
    if (isGameOver || isGameWon) {
      setShowMessage(true);
    }
  };

  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowMessage(false);
  };

  const onChange = (input) => {
    console.log('Input changed', input);
  };

  const { handleKeyPress } = useHandleKeyPress({
    allowMoreKeys,
    attempts,
    setAttempts,
    words,
    setWords,
    handleSubmit,
    isGameOver,
    isGameWon,
  });

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <TableContainer component={Paper} style={{ width: '40%' }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow key="header">
                <TableCell
                  colSpan={numberOfColumns}
                  sx={{ textAlign: 'center' }}
                >
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
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          position: 'absolute',
          bottom: '5%',
        }}
      >
        <div style={{ width: '35%' }}>
          <Keyboard
            keyboardRef={(r) => (keyboard.current = r)}
            layout={keyboardLayout}
            onChange={onChange}
            onKeyPress={handleKeyPress}
            physicalKeyboardHighlight
            physicalKeyboardHighlightPress
            maxLength={numberOfLetters}
            buttonTheme={buttonTheme}
          />
        </div>
      </div>
      <Snackbar
        open={showMessage}
        autoHideDuration={6000}
        onClose={handleCloseMessage}
      >
        <Alert
          severity={isGameWon ? 'success' : 'info'}
          sx={{ width: '100%' }}
          onClose={handleCloseMessage}
        >
          {isGameWon ? messages.success : messages.failure}
        </Alert>
      </Snackbar>
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
