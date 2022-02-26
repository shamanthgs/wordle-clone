import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Attempt } from './Attempt';

export const BasicTable = ({ correctWord }) => {
  const numberOfLetters = correctWord.length;
  const numberOfRows = numberOfLetters + 1;
  const numberOfColumns = numberOfLetters + 1;
  return (
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
  const correctWord = 'HELLO';
  return (
    <div>
      <BasicTable correctWord={correctWord} />
    </div>
  );
};
