import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
import { constants } from './constants';

const useStyles = makeStyles((theme) => ({
  letterInput: {
    width: '45px',
    height: '45px',
    fontWeight: 'bold',
    textAlign: 'center',
    outline: 'none',
  },
  partialMatch: {
    backgroundColor: 'yellow',
  },
  perfectMatch: {
    backgroundColor: 'green',
  },
  noMatch: {
    backgroundColor: 'white',
  },
}));

const { PERFECT_MATCH, PARTIAL_MATCH, NO_MATCH } = constants;

export const Attempt = ({
  correctWord,
  attempt,
  numberOfLetters,
  word,
  matches,
}) => {
  const classes = useStyles();

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
              maxLength={1}
              readOnly
            />
          </TableCell>
        )
      )}
    </TableRow>
  );
};
