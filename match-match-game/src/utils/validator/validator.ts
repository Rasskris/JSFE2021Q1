const validate = (regExpPattern: RegExp, inputValue: string): boolean => {
  const isValid = inputValue.search(regExpPattern) !== -1;
  return isValid;
};

export default validate;