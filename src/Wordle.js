import { useState, useCallback } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const deleteActions = ['Delete', 'Backspace'];

const Attempt = ({ attempt, numberOfLetters }) => {
  const [word, setWord] = useState('');

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

  return (
    <TableRow key={attempt}>
      {[...Array.from({ length: numberOfLetters }).keys()].map(
        (letterIndex) => (
          <TableCell key={letterIndex} align="center">
            <input
              style={{
                width: '20px',
                height: '20px',
                fontWeight: 'bold',
                textAlign: 'center',
              }}
              type="text"
              value={word.length > letterIndex ? word[letterIndex] : ''}
              onKeyDown={handleKeyDown}
              maxLength={1}
              readOnly
            />
          </TableCell>
        )
      )}
    </TableRow>
  );
};

export const BasicTable = ({ numberOfLetters = 5 }) => {
  const numberOfRows = numberOfLetters + 1;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow key="header">
            <TableCell colSpan={numberOfLetters} sx={{ textAlign: 'center' }}>
              Wordle
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[...Array.from({ length: numberOfRows }).keys()].map(
            (attemptIndex) => (
              <Attempt
                key={'attempt' + attemptIndex}
                attempt={attemptIndex}
                numberOfLetters={numberOfLetters}
              />
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export const Wordle = () => {
  return (
    <div>
      <BasicTable />
    </div>
  );
};
