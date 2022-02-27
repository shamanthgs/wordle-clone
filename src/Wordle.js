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

const defaultLayout = [
  'Q W E R T Y U I O P',
  'A S D F G H J K L',
  '{enter} Z X C V B N M {bksp}',
];
const keyboardLayout = {
  default: defaultLayout,
};

export const BasicTable = ({ correctWord }) => {
  const numberOfLetters = correctWord.length;
  const numberOfRows = numberOfLetters + 1;
  const numberOfColumns = numberOfLetters + 1;

  const onChange = (input) => {
    console.log('Input changed', input);
  };

  const onKeyPress = (button) => {
    console.log('Button pressed', button);
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
                  attempt={attemptIndex}
                  numberOfLetters={numberOfLetters}
                />
              )
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '550px' }}>
          <Keyboard
            layout={keyboardLayout}
            onChange={onChange}
            onKeyPress={onKeyPress}
            physicalKeyboardHighlight
            physicalKeyboardHighlightPress
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
