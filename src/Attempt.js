import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { useState, useCallback } from 'react';
import { ButtonGroup, Button } from '@mui/material';
import { Done, Clear } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => {
  const commonLetterInput = {
    width: '20px',
    height: '20px',
    fontWeight: 'bold',
    textAlign: 'center',
    outline: 'none',
  };
  return {
    letterInput: { ...commonLetterInput },
    partialMatch: {
      backgroundColor: 'yellow',
    },
    perfectMatch: {
      backgroundColor: 'green',
    },
    noMatch: {
      backgroundColor: 'white',
    },
  };
});

const deleteActions = ['Delete', 'Backspace'];
const PERFECT_MATCH = 0;
const PARTIAL_MATCH = 1;
const NO_MATCH = 2;

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

export const Attempt = ({ correctWord, attempt, numberOfLetters }) => {
  const [word, setWord] = useState('');
  const [matches, setMatches] = useState('');
  const classes = useStyles();

  const handleKeyDown = useCallback(
    (keyPressEvent) => {
      if (keyPressEvent.key.length === 1 && word.length < numberOfLetters) {
        setWord((word) => word + keyPressEvent.key.toLocaleUpperCase());
      }
      if (deleteActions.includes(keyPressEvent.key)) {
        setWord((word) => word.slice(0, -1));
      }
    },
    [setWord, word.length, numberOfLetters]
  );

  const handleClear = useCallback(() => {
    setWord('');
  }, [setWord]);

  const handleSubmit = useCallback(() => {
    const matches = validateWord(correctWord, word);
    setMatches(matches);
    console.log('correctWord', correctWord);
    console.log('word', word);
    console.log('matches', matches);
  }, [setMatches, word, correctWord]);

  return (
    <TableRow key={attempt}>
      {[...Array.from({ length: numberOfLetters }).keys()].map(
        (letterIndex) => (
          <TableCell key={letterIndex} align="center" size="small">
            <input
              className={classNames({
                [classes.letterInput]: true,
                [classes.partialMatch]:
                  parseInt(matches[letterIndex]) === PARTIAL_MATCH,
                [classes.perfectMatch]:
                  parseInt(matches[letterIndex]) === PERFECT_MATCH,
                [classes.noMatch]: parseInt(matches[letterIndex]) === NO_MATCH,
              })}
              type="text"
              value={word.length > letterIndex ? word[letterIndex] : ''}
              onKeyDown={handleKeyDown}
              maxLength={1}
              readOnly
            />
          </TableCell>
        )
      )}
      <TableCell key="actions" size="small" align="center">
        <ButtonGroup aria-label="actions">
          <Button size="small" aria-label="submit" onClick={handleSubmit}>
            <Done />
          </Button>
          <Button size="small" aria-label="clear" onClick={handleClear}>
            <Clear />
          </Button>
        </ButtonGroup>
      </TableCell>
    </TableRow>
  );
};
