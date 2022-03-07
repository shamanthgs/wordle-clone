export const useHandleKeyPress = ({
  handleSubmit,
  setAttempts,
  words,
  attempts,
  setWords,
  allowMoreKeys,
  isGameOver,
  isGameWon,
}) => {
  const handleKeyPress = (button) => {
    console.log('Button pressed', button);
    switch (button) {
      case '{enter}':
        if (allowMoreKeys) return;
        handleSubmit();
        if (isGameOver || isGameWon) return;
        setAttempts((currAttempts) => currAttempts + 1);
        break;
      case '{backspace}':
        if (isGameOver || isGameWon) return;
        if (words[attempts].length > 0) {
          setWords((currWords) =>
            currWords.map((word, index) =>
              index === attempts ? word.slice(0, -1) : word
            )
          );
        }
        break;
      default:
        if (allowMoreKeys) {
          setWords((currWords) =>
            currWords.map((word, index) =>
              index === attempts ? word + button.toLocaleUpperCase() : word
            )
          );
        }
    }
  };

  return { handleKeyPress };
};
