export const useHandleKeyPress = ({
  handleSubmit,
  words,
  attempts,
  setWords,
  isGameOver,
  isGameWon,
  numberOfLetters,
}) => {
  const allowMoreKeys = words[attempts].length < numberOfLetters;
  const handleKeyPress = (button) => {
    console.log('Button pressed', button);
    switch (button) {
      case '{enter}':
        if (allowMoreKeys) return;
        handleSubmit();
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
