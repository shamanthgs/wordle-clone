export const useHandleKeyPress = ({
  handleSubmit,
  setAttempts,
  words,
  attempts,
  setWords,
  allowMoreKeys,
}) => {
  const handleKeyPress = (button) => {
    console.log('Button pressed', button);
    switch (button) {
      case '{enter}':
        handleSubmit();
        setAttempts((currAttempts) => currAttempts + 1);
        break;
      case '{bksp}':
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
