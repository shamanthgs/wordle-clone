import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { messages } from './messages';

export const Notification = ({ isGameWon, showMessage, setShowMessage }) => {
  const handleCloseMessage = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setShowMessage(false);
  };
  return (
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
  );
};
